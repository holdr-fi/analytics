import { POOL_SUBGRAPH, ZERO_ADDRESS } from '../../constants';
import { SubgraphClient } from '../../utils';
const subgraphClient = new SubgraphClient(POOL_SUBGRAPH);

export const getAllSwaps = async function getAllSwaps(): Promise<{ swaps: SwapData[] }> {
  const args = {
    orderDirection: 'asc',
  };

  const attrs = {
    tokenIn: true,
    tokenOut: true,
    tokenAmountIn: true,
    tokenAmountOut: true,
    timestamp: true,
  };

  const query = {
    swaps: {
      __args: args,
      ...attrs,
    },
  };

  const data = await subgraphClient.get(query);
  return data;
};

export type SwapData = {
  tokenIn: string;
  tokenOut: string;
  tokenAmountIn: string;
  tokenAmountOut: string;
  timestamp: number;
};
