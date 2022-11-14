import { Contract, utils } from 'ethers';
import { contracts, provider } from '../network';
import ERC20ABI from '../network/abis/ERC20.json';
import { PoolInfo, SwapRequest, SwapKind, SwapInfo } from '../types';
import { ZERO_ADDRESS } from '../constants';
const { parseUnits, formatUnits } = utils;

export const getLBPPrice = async function getLBPPrice(): Promise<SwapInfo[]> {
  const lbp: Contract = contracts['LBPPool'];
  const vault: Contract = contracts['Vault'];
  const poolId = await lbp.getPoolId();
  const poolInfo: PoolInfo = await vault.getPoolTokens(poolId);

  const decimals = await Promise.all(
    poolInfo.tokens.map((token) => {
      const tokenContract: Contract = new Contract(token, ERC20ABI, provider);
      return tokenContract.decimals();
    })
  );

  // TO-DO Make decimals and symbol requests concurrent.

  const symbols = await Promise.all(
    poolInfo.tokens.map((token) => {
      const tokenContract: Contract = new Contract(token, ERC20ABI, provider);
      return tokenContract.symbol();
    })
  );

  const swapRequest_0to1: SwapRequest = {
    kind: SwapKind.GIVEN_IN,
    tokenIn: poolInfo.tokens[0],
    tokenOut: poolInfo.tokens[1],
    amount: parseUnits('1.0', decimals[0]),
    poolId: poolId,
    lastChangeBlock: poolInfo.lastChangeBlock,
    from: ZERO_ADDRESS,
    to: ZERO_ADDRESS,
    userData: '0x',
  };

  const swapRequest_1to0: SwapRequest = {
    kind: SwapKind.GIVEN_IN,
    tokenIn: poolInfo.tokens[1],
    tokenOut: poolInfo.tokens[0],
    amount: parseUnits('1.0', decimals[1]),
    poolId: poolId,
    lastChangeBlock: poolInfo.lastChangeBlock,
    from: ZERO_ADDRESS,
    to: ZERO_ADDRESS,
    userData: '0x',
  };

  const swapAmounts = await Promise.all([
    lbp.callStatic.onSwap(swapRequest_0to1, poolInfo.balances[0], poolInfo.balances[1]),
    lbp.callStatic.onSwap(swapRequest_1to0, poolInfo.balances[1], poolInfo.balances[0]),
  ]);

  const swapInfo: SwapInfo[] = poolInfo.tokens.map((token, index) => {
    return {
      description: `${symbols[index]} to ${symbols[index === 0 ? 1 : 0]}`,
      tokenIn: token,
      tokenOut: poolInfo.tokens[index === 0 ? 1 : 0],
      decimalsIn: decimals[index],
      decimalsOut: decimals[index === 0 ? 1 : 0],
      rate: parseFloat(formatUnits(swapAmounts[index], decimals[index])),
    };
  });

  return swapInfo;
};
