import { BigNumber, Contract, utils } from 'ethers';
import { contracts, provider } from '../network';
import ERC20ABI from '../network/abis/ERC20.json';
import { PoolInfo, SwapRequest, SwapKind } from '../types';
import { ZERO_ADDRESS, ZERO } from '../constants';
import { getBlockForTimestamp, getCoingeckoHistoricalPrices } from '../utils';
const { parseUnits, formatUnits } = utils;

/*
Require return type:
[
    ["2022/11/16 00:00", 1.000],
    ["2022/11/16 01:00", 0.959],
]
*/

export const getLBPPrices = async function getLBPPrices(): Promise<(string | number)[][]> {
  const hldr = contracts['HLDR'];
  const lbp: Contract = contracts['LBPPool'];
  const vault: Contract = contracts['Vault'];
  const [poolId, gradualWeightUpdateParams] = await Promise.all([lbp.getPoolId(), lbp.getGradualWeightUpdateParams()]);
  const { startTime } = gradualWeightUpdateParams;
  const poolInfo: PoolInfo = await vault.getPoolTokens(poolId);
  const reserveTokenAddress = poolInfo.tokens[0] === hldr.address ? poolInfo.tokens[1] : poolInfo.tokens[0];
  const reserveToken = new Contract(reserveTokenAddress, ERC20ABI, provider);
  const reserveTokenDecimals = await reserveToken.decimals();

  const mockHistoricalReservePrices = [
    [1667984447818, 1295.5173915883518],
    [1667988001360, 1275.727478421892],
    [1667991621889, 1257.919891219965],
    [1667995235468, 1212.1339091642994],
    [1667998834754, 1226.711429850461],
    [1668002416551, 1209.5479165437748],
    [1668006084078, 1231.2971180429136],
    [1668009689771, 1174.6021421747203],
    [1668013302486, 1170.0549656509652],
    [1668016911651, 1171.4686954820843],
  ];

  // const historicalReservePrices = (
  //   await getCoingeckoHistoricalPrices(
  //     [reserveTokenAddress],
  //     parseInt(String(startTime), 10),
  //     Math.floor(Date.now() / 1000)
  //   )
  // )[reserveTokenAddress];

  const historicalReservePrices = mockHistoricalReservePrices;

  // Get historical block number to query Vault contract.
  // example historicalPrice is [ 1667984455781, 1.000897821425 ], in type [ Unix timestamp in ms, price ].
  const timestamps: number[] = historicalReservePrices.map((historicalPrice) => Math.floor(historicalPrice[0] / 1000));

  if (timestamps.length === 0) {
    return [];
  }

  // Query Etherscan API for block numbers for first and last timestamp - cannot easily query for all timestamps acquired from Coingecko because of 5 requests/second rate limit on Etherscan API.
  // We then do a simple linear interpolation to estimate the remaining block numbers.
  const [startingBlockNumber, endingBlockNumber] = await Promise.all([
    getBlockForTimestamp(timestamps[0]),
    getBlockForTimestamp(timestamps[timestamps.length - 1]),
  ]);

  // Keep average block time as a float, don't round down here.
  const averageBlockTime =
    (timestamps[timestamps.length - 1] - timestamps[0]) / (endingBlockNumber - startingBlockNumber);

  const historicalBlockNumbers: number[] = timestamps.map((timestamp, index) => {
    switch (index) {
      case 0:
        return startingBlockNumber;
      case timestamps.length - 1:
        return endingBlockNumber;
      default: {
        const secondsSinceStart = timestamp - timestamps[0];
        const interpolatedBlocksSinceStarted = secondsSinceStart / averageBlockTime;
        const interpolatedBlockNumber = Math.floor(startingBlockNumber + interpolatedBlocksSinceStarted);
        return interpolatedBlockNumber;
      }
    }
  });

  const swapRequest_reserveToHLDR: SwapRequest = {
    kind: SwapKind.GIVEN_IN,
    tokenIn: reserveTokenAddress,
    tokenOut: hldr.address,
    amount: parseUnits('1.0', reserveTokenDecimals),
    poolId: poolId,
    lastChangeBlock: poolInfo.lastChangeBlock,
    from: ZERO_ADDRESS,
    to: ZERO_ADDRESS,
    userData: '0x',
  };

  const historicalLBPprices: BigNumber[] = await Promise.all(
    historicalBlockNumbers.map(async (blockNumber) => {
      const historicalPoolInfo = await vault.getPoolTokens(poolId, { blockTag: blockNumber });
      const poolReserveBalance =
        historicalPoolInfo.tokens[0] === reserveTokenAddress
          ? historicalPoolInfo.balances[0]
          : historicalPoolInfo.balances[1];

      const poolHLDRBalance =
        historicalPoolInfo.tokens[0] === reserveTokenAddress
          ? historicalPoolInfo.balances[1]
          : historicalPoolInfo.balances[0];

      // Edge case where pool has been created, but liquidity is has not yet been deposited.
      if (poolReserveBalance.eq(ZERO) || poolHLDRBalance.eq(ZERO)) {
        return ZERO;
      }

      const lbpPrice = await lbp.callStatic.onSwap(swapRequest_reserveToHLDR, poolReserveBalance, poolHLDRBalance);
      return lbpPrice;
    })
  );

  const parsedLBPprices = timestamps.map((timestamp, index) => {
    // Parse from unix timestamp in seconds to '2022/11/16 00:00' form.
    const dateObject = new Date(timestamp * 1000);
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth()).padStart(2, '0');
    const day = String(dateObject.getDate()).padStart(2, '0');
    const hours = String(dateObject.getHours()).padStart(2, '0');
    const minutes = String(dateObject.getMinutes()).padStart(2, '0');
    const timeString = `${year}/${month}/${day} ${hours}:${minutes}`;

    // This is USD price for 1 (adjusted for decimals) reserveToken
    const coingeckoPrice = historicalReservePrices[index][1];
    // This is amount of HLDR for 1 (adjusted for decimals) reserveToken
    const lbpPrice = historicalLBPprices[index];
    let usdPriceOfHLDR: number;
    if (lbpPrice.eq(ZERO)) {
      // Avoid /0 error
      usdPriceOfHLDR = 0;
    } else {
      // Get amount of reserve token, for 1 HLDR
      const inverseLBPprice = formatUnits(BigNumber.from('10').pow(36).div(lbpPrice), 18);
      usdPriceOfHLDR = parseFloat(inverseLBPprice) * coingeckoPrice;
    }

    return [timeString, usdPriceOfHLDR];
  });

  return parsedLBPprices;
};
