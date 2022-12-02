import { getHPTLocked, getTotalHPT } from './';

export const getPercentageHPTLocked = async function getPercentageHPTLocked(): Promise<number> {
  const [hptLocked, totalHPT] = await Promise.all([getHPTLocked(), getTotalHPT()]);
  return hptLocked / totalHPT;
};
