import { contracts, provider } from '../network';
import { Contract, utils } from 'ethers';
import ERC20ABI from '../network/abis/ERC20.json';
const { formatUnits } = utils;

export const logSwaps = async function logSwaps() {
  const hldr = contracts['HLDR'];
  const lbp: Contract = contracts['LBPPool'];
  const vault: Contract = contracts['Vault'];
  const poolId = await lbp.getPoolId();

  const [poolInfo, ...swapEvents] = await Promise.all([
    vault.getPoolTokens(poolId),
    vault.queryFilter(vault.filters.Swap(poolId, null, null)),
  ]);

  const reserveTokenAddress = poolInfo.tokens[0] === hldr.address ? poolInfo.tokens[1] : poolInfo.tokens[0];
  const reserveToken = new Contract(reserveTokenAddress, ERC20ABI, provider);
  const [hldrDecimals, reserveTokenDecimals, hldrSymbol, reserveTokenSymbol] = await Promise.all([
    hldr.decimals(),
    reserveToken.decimals(),
    hldr.symbol(),
    reserveToken.symbol(),
  ]);

  swapEvents[0].map((event) => {
    const logObject = {
      blockNumber: event?.blockNumber,
      txHash: event?.transactionHash,
      tokenIn: event?.args?.tokenIn === hldr.address ? hldrSymbol : reserveTokenSymbol,
      tokenOut: event?.args?.tokenOut === hldr.address ? hldrSymbol : reserveTokenSymbol,
      amountIn: formatUnits(
        event?.args?.amountIn,
        event?.args?.tokenIn === hldr.address ? hldrDecimals : reserveTokenDecimals
      ),
      amountOut: formatUnits(
        event?.args?.amountOut,
        event?.args?.tokenOut === hldr.address ? hldrDecimals : reserveTokenDecimals
      ),
    };

    console.log(
      `Block: ${logObject.blockNumber}, tx: ${logObject.txHash}, ${logObject.amountIn} ${logObject.tokenIn} swapped for ${logObject.amountOut} ${logObject.tokenOut}`
    );
  });
};
