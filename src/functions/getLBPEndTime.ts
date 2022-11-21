import { Contract } from 'ethers';
import { contracts } from '../network';

export const getLBPEndTime = async function getLBPEndTime(): Promise<number> {
  const lbp: Contract = contracts['LBPPool'];
  const { endTime } = await lbp.getGradualWeightUpdateParams();
  return parseInt(String(endTime), 10);
};
