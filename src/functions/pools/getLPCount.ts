import { POOL_SUBGRAPH, ZERO_ADDRESS } from '../../constants';
import { SubgraphClient } from '../../utils';
const subgraphClient = new SubgraphClient(POOL_SUBGRAPH);

export const getLPCount = async function getLPCount(): Promise<number> {
  const lps = await getLPs();
  return lps.size;
};

const getLPs = async function getLPs(): Promise<Set<string>> {
  const data = await Promise.all([
    _getLPquery(0, 'asc'),
    _getLPquery(1000, 'asc'),
    _getLPquery(2000, 'asc'),
    _getLPquery(3000, 'asc'),
    _getLPquery(4000, 'asc'),
    _getLPquery(5000, 'asc'),
    _getLPquery(0, 'desc'),
    _getLPquery(1000, 'desc'),
    _getLPquery(2000, 'desc'),
    _getLPquery(3000, 'desc'),
    _getLPquery(4000, 'desc'),
    _getLPquery(5000, 'desc'),
  ]);

  const lps = data.reduce((lpSet: Set<string>, poolSharesCollection) => {
    poolSharesCollection?.poolShares.reduce((innerLpSet: Set<string>, userAddress) => {
      innerLpSet.add(userAddress?.userAddress?.id);
      return innerLpSet;
    }, lpSet);
    return lpSet;
  }, new Set<string>());

  lps.delete(ZERO_ADDRESS);
  return lps;
};

const _getLPquery = async function _getLPquery(skip: number, orderDirection: 'asc' | 'desc') {
  const args = {
    first: 1000,
    skip: skip,
    orderBy: 'balance',
    orderDirection: orderDirection,
    where: { balance_gt: 0 },
  };

  const attrs = {
    userAddress: {
      id: true,
    },
  };

  const query = {
    poolShares: {
      __args: args,
      ...attrs,
    },
  };

  return await subgraphClient.get(query);
};
