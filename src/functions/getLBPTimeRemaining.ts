import { Contract } from 'ethers';
import { contracts } from '../network';

export const getLBPTimeRemaining = async function getLBPTimeRemaining(): Promise<number> {
  const lbp: Contract = contracts['LBPPool'];
  const { endTime } = await lbp.getGradualWeightUpdateParams();
  const parsedEndTime = parseInt(String(endTime), 10);
  const timeRemaining = parsedEndTime - Date.now() / 1000;
  return timeRemaining > 0 ? timeRemaining : 0;
};
