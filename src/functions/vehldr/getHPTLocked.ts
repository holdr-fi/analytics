import { GAUGE_SUBGRAPH } from '../../constants';
import { SubgraphClient } from '../../utils';
const subgraphClient = new SubgraphClient(GAUGE_SUBGRAPH);

export const getHPTLocked = async function getHPTLocked(): Promise<number> {
  const args = {
    orderDirection: 'asc',
  };

  const attrs = {
    stakedSupply: true,
  };

  const query = {
    votingEscrows: {
      __args: args,
      ...attrs,
    },
  };

  const data = await subgraphClient.get(query);
  const hptLocked = parseFloat(data?.votingEscrows[0]?.stakedSupply);
  return hptLocked;
};
