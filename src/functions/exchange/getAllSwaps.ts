import { POOL_SUBGRAPH, ZERO_ADDRESS } from '../../constants';
import { SubgraphClient } from '../../utils';
const subgraphClient = new SubgraphClient(POOL_SUBGRAPH);
import { getCurrentTimestamp } from '../../utils';

export const getAllSwapsWithinTime = async function getAllSwapsWithinTime(withinTime: number): Promise<SwapData[]> {
  const data = await Promise.all([
    _getSwapsQuery(getCurrentTimestamp() - withinTime, 0, 'asc'),
    _getSwapsQuery(getCurrentTimestamp() - withinTime, 1000, 'asc'),
    _getSwapsQuery(getCurrentTimestamp() - withinTime, 2000, 'asc'),
    _getSwapsQuery(getCurrentTimestamp() - withinTime, 3000, 'asc'),
    _getSwapsQuery(getCurrentTimestamp() - withinTime, 4000, 'asc'),
    _getSwapsQuery(getCurrentTimestamp() - withinTime, 5000, 'asc'),
    _getSwapsQuery(getCurrentTimestamp() - withinTime, 0, 'desc'),
    _getSwapsQuery(getCurrentTimestamp() - withinTime, 1000, 'desc'),
    _getSwapsQuery(getCurrentTimestamp() - withinTime, 2000, 'desc'),
    _getSwapsQuery(getCurrentTimestamp() - withinTime, 3000, 'desc'),
    _getSwapsQuery(getCurrentTimestamp() - withinTime, 4000, 'desc'),
    _getSwapsQuery(getCurrentTimestamp() - withinTime, 5000, 'desc'),
  ]);

  // Build hashmap of swaps to avoid duplicates
  const swapMap: Map<string, SwapData> = data.reduce((runningSwapMap, swapsQuery) => {
    swapsQuery?.swaps.forEach((swapData) => {
      runningSwapMap.set(swapData?.id, {
        tokenIn: swapData?.tokenIn,
        tokenOut: swapData?.tokenOut,
        tokenAmountIn: swapData?.tokenAmountIn,
        tokenAmountOut: swapData?.tokenAmountOut,
      });
    });
    return runningSwapMap;
  }, new Map());

  return Array.from(swapMap.values());
};

const _getSwapsQuery = async function _getSwapsQuery(
  first_timestamp: number,
  skip: number,
  orderDirection: 'asc' | 'desc'
) {
  const baseEntity = 'swaps';

  const args = {
    first: 1000,
    skip: skip,
    orderBy: 'timestamp',
    orderDirection: orderDirection,
    where: { timestamp_gt: first_timestamp },
  };

  const attrs = {
    id: true,
    tokenIn: true,
    tokenOut: true,
    tokenAmountIn: true,
    tokenAmountOut: true,
    timestamp: true,
  };

  const query = {
    [baseEntity]: {
      __args: args,
      ...attrs,
    },
  };

  return await subgraphClient.get(query);
};

export type SwapData = {
  tokenIn: string;
  tokenOut: string;
  tokenAmountIn: string;
  tokenAmountOut: string;
};
