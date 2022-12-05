import { GAUGE_SUBGRAPH } from '../../constants';
import { SubgraphClient } from '../../utils';
const subgraphClient = new SubgraphClient(GAUGE_SUBGRAPH);
import { CHAIN_ID } from '../../constants';

export const getHPTLocked = async function getHPTLocked(): Promise<number> {
  const data = await Promise.all([
    _getHPTLocked(0, 'asc'),
    _getHPTLocked(1000, 'asc'),
    _getHPTLocked(2000, 'asc'),
    _getHPTLocked(3000, 'asc'),
    _getHPTLocked(4000, 'asc'),
    _getHPTLocked(5000, 'asc'),
    _getHPTLocked(0, 'desc'),
    _getHPTLocked(1000, 'desc'),
    _getHPTLocked(2000, 'desc'),
    _getHPTLocked(3000, 'desc'),
    _getHPTLocked(4000, 'desc'),
    _getHPTLocked(5000, 'desc'),
  ]);

  const hptLockedMap = data.reduce((runningHPTLockedMap, lockCollection) => {
    lockCollection?.votingEscrowLocks.forEach((lock) => {
      runningHPTLockedMap.set(lock?.id, parseFloat(lock?.lockedBalance));
    });
    return runningHPTLockedMap;
  }, new Map<string, number>());

  const hptLockBalances: number[] = Array.from(hptLockedMap.values());
  const totalLockedBalance = hptLockBalances.reduce((sum, lockedBalance) => sum + lockedBalance, 0);
  return totalLockedBalance;
};

const _getHPTLocked = async function _getHPTLocked(skip: number, orderDirection: 'asc' | 'desc') {
  let balancePropertyName = '';

  switch (CHAIN_ID) {
    case '1':
      balancePropertyName = 'lockedBalance';
      break;
    case '80001':
      balancePropertyName = 'stakedSupply';
      break;
    case '1313161554':
      balancePropertyName = 'stakedSupply';
      break;
    default:
      balancePropertyName = 'stakedSupply';
      break;
  }

  const args = {
    first: 1000,
    skip: skip,
    orderBy: balancePropertyName,
    orderDirection: orderDirection,
    where: { [`${balancePropertyName}_gt`]: 0 },
  };

  const attrs = {
    id: true,
    lockedBalance: true,
  };

  const query = {
    votingEscrowLocks: {
      __args: args,
      ...attrs,
    },
  };

  return await subgraphClient.get(query);
};
