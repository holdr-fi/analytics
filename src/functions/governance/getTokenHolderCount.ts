import { ZERO_ADDRESS } from '../../constants';
import { contracts } from '../../network';
import { getEvents } from '../../utils';

// TODO - Can we refactor to fulfil the query without using eth_getLogs?
// Cannot fulfil this query on mainnet

export const getTokenHolderCount = async function getTokenHolderCount(): Promise<number> {
  const tokenHolders = await getTokenHolders();
  return tokenHolders.size;
};

export const getTokenHolders = async function getTokenHolders(): Promise<Set<string>> {
  const hldr = contracts['HLDR'];
  const transferEvents = await getEvents(hldr, hldr.filters.Transfer(), 0, 'latest');

  const tokenHolders = transferEvents.reduce((tokenholderSet, event) => {
    tokenholderSet.add(event?.args?.from);
    tokenholderSet.add(event?.args?.to);
    return tokenholderSet;
  }, new Set<string>());
  tokenHolders.delete(ZERO_ADDRESS);
  return tokenHolders;
};
