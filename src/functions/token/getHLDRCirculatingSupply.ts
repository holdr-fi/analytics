import { utils, BigNumber } from 'ethers';
const { formatUnits } = utils;
import { contracts } from '../../network';
import { NON_CIRCULATING_HLDR_ADDRESSES } from '../../constants';

// We define circulating_supply as total_supply - multisig_balance

export const getHLDRCirculatingSupply = async function getHLDRCirculatingSupply(): Promise<number> {
  const hldr = contracts['HLDR'];
  const totalSupply: BigNumber = await hldr.totalSupply();
  const nonCirculatingSupplyBalances = await Promise.all(
    NON_CIRCULATING_HLDR_ADDRESSES.map((address) => hldr.balanceOf(address))
  );
  const circulatingSupply = nonCirculatingSupplyBalances.reduce((accumulatedCirculatingSupply, balance) => {
    return totalSupply.sub(balance);
  }, totalSupply);

  return parseFloat(formatUnits(circulatingSupply, 18));
};
