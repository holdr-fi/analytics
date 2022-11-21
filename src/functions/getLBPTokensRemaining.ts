import { BigNumber, Contract, utils } from 'ethers';
import { contracts } from '../network';
const { formatUnits } = utils;

export const getLBPTokensRemaining = async function getLBPTokensRemaining(): Promise<number> {
  const lbp: Contract = contracts['LBPPool'];
  const vault: Contract = contracts['Vault'];
  const hldr: Contract = contracts['HLDR'];
  const poolId = await lbp.getPoolId();
  const poolInfo = await vault.getPoolTokens(poolId);

  const hldrBalance = poolInfo.balances.reduce((runningBalance, balance, index) => {
    if (poolInfo.tokens[index] === hldr.address) {
      return runningBalance.add(balance);
    } else {
      return runningBalance;
    }
  }, BigNumber.from('0'));

  return parseFloat(formatUnits(hldrBalance, 18));
};
