import { contracts, provider } from '../../network';
import { utils, Contract } from 'ethers';
import ERC20ABI from '../../network/abis/ERC20.json';
const { formatUnits } = utils;

export const getTotalHPT = async function getTotalHPT(): Promise<number> {
  const votingEscrow = contracts['VotingEscrow'];
  const hptAddress = await votingEscrow['token()']();
  const hpt = new Contract(hptAddress, ERC20ABI, provider);
  const hptTotalSupply = await hpt.totalSupply();
  return parseFloat(formatUnits(hptTotalSupply, 18));
};
