import { getTokenHolders } from './';
import { getLPs } from '../pools';

// TODO - Require different method to get tokenholders than using eth_getLogs

export const getTokenHolderAndLPCount = async function getTokenHolderAndLPCount(): Promise<number> {
  const [tokenholders, lps] = await Promise.all([getTokenHolders(), getLPs()]);

  const tokenholdersAndLp = Array.from(tokenholders).reduce((runningSet, tokenholder) => {
    if (lps.has(tokenholder.toLowerCase())) {
      runningSet.add(tokenholder.toLowerCase());
    }
    return runningSet;
  }, new Set<string>());

  return tokenholdersAndLp.size;
};
