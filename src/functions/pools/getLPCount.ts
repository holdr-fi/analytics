import { POOL_SUBGRAPH, ZERO_ADDRESS } from '../../constants';
import { SubgraphClient } from '../../utils';
const subgraphClient = new SubgraphClient(POOL_SUBGRAPH);

export const getLPCount = async function getLPCount(): Promise<number> {
  const lps = await getLPs();
  return lps.size;
};

export const getLPs = async function getLPs(): Promise<Set<string>> {
  const args = {
    orderDirection: 'asc',
  };

  const attrs = {
    id: true,
    sharesOwned: {
      id: true,
    },
  };

  const query = {
    users: {
      __args: args,
      ...attrs,
    },
  };

  const data = await subgraphClient.get(query);

  const lps = data?.users.reduce((lpSet: Set<string>, userInfo) => {
    if (userInfo?.sharesOwned?.length > 0) {
      lpSet.add(userInfo?.id);
    }
    return lpSet;
  }, new Set<string>());

  lps.delete(ZERO_ADDRESS);
  return lps;
};
