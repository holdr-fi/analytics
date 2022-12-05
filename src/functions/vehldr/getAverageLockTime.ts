import { GAUGE_SUBGRAPH } from '../../constants';
import { SubgraphClient, getCurrentTimestamp } from '../../utils';
const subgraphClient = new SubgraphClient(GAUGE_SUBGRAPH);

export const getAverageLockTime = async function getAverageLockTime(): Promise<number> {
  const data = await Promise.all([
    _getLocktimeQuery(0, 'asc'),
    _getLocktimeQuery(1000, 'asc'),
    _getLocktimeQuery(2000, 'asc'),
    _getLocktimeQuery(3000, 'asc'),
    _getLocktimeQuery(4000, 'asc'),
    _getLocktimeQuery(5000, 'asc'),
    _getLocktimeQuery(0, 'desc'),
    _getLocktimeQuery(1000, 'desc'),
    _getLocktimeQuery(2000, 'desc'),
    _getLocktimeQuery(3000, 'desc'),
    _getLocktimeQuery(4000, 'desc'),
    _getLocktimeQuery(5000, 'desc'),
  ]);

  const locktimeMap = data.reduce((runningLocktimeMap, votingEscrowCollection) => {
    votingEscrowCollection?.votingEscrowLocks.forEach((lock) => {
      runningLocktimeMap.set(lock?.id, lock?.unlockTime);
    });
    return runningLocktimeMap;
  }, new Map<string, number>());

  const unlockTimes: string[] = Array.from(locktimeMap.values());

  const totalSecondsRemaining = unlockTimes.reduce(
    (sum, unlockTime) => sum + Math.max(parseInt(unlockTime) - getCurrentTimestamp(), 0),
    0
  );

  return totalSecondsRemaining / unlockTimes.length;
};

const _getLocktimeQuery = async function _getLocktimeQuery(skip: number, orderDirection: 'asc' | 'desc') {
  const args = {
    first: 1000,
    skip: skip,
    orderBy: 'unlockTime',
    orderDirection: orderDirection,
  };

  const attrs = {
    id: true,
    unlockTime: true,
  };

  const query = {
    votingEscrowLocks: {
      __args: args,
      ...attrs,
    },
  };

  return await subgraphClient.get(query);
};
