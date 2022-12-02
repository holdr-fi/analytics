import { GAUGE_SUBGRAPH } from '../../constants';
import { SubgraphClient, getCurrentTimestamp } from '../../utils';
const subgraphClient = new SubgraphClient(GAUGE_SUBGRAPH);

export const getAverageLockTime = async function getAverageLockTime(): Promise<number> {
  const args = {
    orderDirection: 'asc',
  };

  const attrs = {
    unlockTime: true,
  };

  const query = {
    votingEscrowLocks: {
      __args: args,
      ...attrs,
    },
  };

  const data = await subgraphClient.get(query);
  const totalSecondsRemaining = data?.votingEscrowLocks.reduce(
    (sum, { unlockTime }) => sum + Math.max(parseInt(unlockTime) - getCurrentTimestamp(), 0),
    0
  );
  return totalSecondsRemaining / data?.votingEscrowLocks.length;
};
