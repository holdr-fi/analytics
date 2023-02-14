import { contracts } from '../../network';
import { utils } from 'ethers';
const { formatUnits } = utils;

export const getHLDRTotalSupply = async function getHLDRTotalSupply(): Promise<number> {
  const hldr = contracts['HLDR'];
  const totalSupply = await hldr.totalSupply();
  return parseFloat(formatUnits(totalSupply, 18));
};
