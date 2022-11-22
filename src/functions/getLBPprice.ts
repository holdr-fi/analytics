import { BigNumber, Contract, utils } from 'ethers';
import { contracts, provider } from '../network';
import ERC20ABI from '../network/abis/ERC20.json';
import { PoolInfo, SwapRequest, SwapKind } from '../types';
import { ZERO_ADDRESS, ZERO } from '../constants';
import { getCoingeckoSpotPrice } from '../utils';
const { parseUnits, formatUnits } = utils;

export const getLBPprice = async function getLBPprice(): Promise<number> {
  const hldr = contracts['HLDR'];
  const lbp: Contract = contracts['LBPPool'];
  const vault: Contract = contracts['Vault'];
  const poolId = await lbp.getPoolId();
  const poolInfo: PoolInfo = await vault.getPoolTokens(poolId);
  const reserveTokenAddress = poolInfo.tokens[0] === hldr.address ? poolInfo.tokens[1] : poolInfo.tokens[0];
  const reserveToken = new Contract(reserveTokenAddress, ERC20ABI, provider);
  const reserveTokenDecimals = await reserveToken.decimals();
  const poolReserveBalance = poolInfo.tokens[0] === reserveTokenAddress ? poolInfo.balances[0] : poolInfo.balances[1];
  const poolHLDRBalance = poolInfo.tokens[0] === reserveTokenAddress ? poolInfo.balances[1] : poolInfo.balances[0];

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

  if (poolReserveBalance.eq(ZERO) || poolHLDRBalance.eq(ZERO)) {
    return 0;
  }

  // This is amount of HLDR for 1 (adjusted for decimals) reserveToken
  const lbpPrice = await lbp.callStatic.onSwap(swapRequest_reserveToHLDR, poolReserveBalance, poolHLDRBalance);
  if (lbpPrice.eq(ZERO)) {
    return 0;
  }

  // This is USD price for 1 (adjusted for decimals) reserveToken
  const coingeckoPrice = (await getCoingeckoSpotPrice([reserveTokenAddress]))[reserveTokenAddress];

  const inverseLBPprice = formatUnits(BigNumber.from('10').pow(36).div(lbpPrice), 18);
  const usdPriceOfHLDR = parseFloat(inverseLBPprice) * coingeckoPrice;
  return usdPriceOfHLDR;
};
