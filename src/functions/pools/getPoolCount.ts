import { POOL_SUBGRAPH } from '../../constants';
import { SubgraphClient } from '../../utils';
const subgraphClient = new SubgraphClient(POOL_SUBGRAPH);

export const getPoolCount = async function getPoolCount(): Promise<number> {
  const args = {
    first: 1,
  };

  const attrs = {
    poolCount: true,
  };

  const query = {
    balancers: {
      __args: args,
      ...attrs,
    },
  };

  const data = await subgraphClient.get(query);
  const poolCount = data?.balancers[0]?.poolCount;
  return poolCount;
};
