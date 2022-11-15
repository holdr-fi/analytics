import { Contract } from 'ethers';
import { contracts } from '../network';

export const getLBPEndTime = async function getLBPEndTime(): Promise<number> {
  const lbp: Contract = contracts['LBPPool'];
  const { endTime } = await lbp.getGradualWeightUpdateParams();

  // Requesting to return end unix timestamp, rather than seconds remaining.
  // const parsedEndTime = parseInt(String(endTime), 10);
  // const timeRemaining = parsedEndTime - Date.now() / 1000;
  // return timeRemaining > 0 ? timeRemaining : 0;
  return parseInt(String(endTime), 10);
};
