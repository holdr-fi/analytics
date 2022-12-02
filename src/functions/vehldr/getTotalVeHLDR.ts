import { contracts } from '../../network';
import { utils } from 'ethers';
const { formatUnits } = utils;

export const getTotalVeHLDR = async function getTotalVeHLDR(): Promise<number> {
  const votingEscrow = contracts['VotingEscrow'];
  const totalSupply = await votingEscrow['totalSupply()']();
  return parseFloat(formatUnits(totalSupply, 18));
};
