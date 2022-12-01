// TO-DO Test against mainnet logic

import { POOL_SUBGRAPH } from '../../constants';
import { SubgraphClient } from '../../utils';
import ERC20ABI from '../../network/abis/ERC20.json';
import { Contract, utils } from 'ethers';
import { contracts, provider } from '../../network';
import { getCoingeckoSpotPrice } from '../../utils';
const subgraphClient = new SubgraphClient(POOL_SUBGRAPH);
const { formatUnits } = utils;

export const getTVL = async function getTVL(): Promise<number> {
  // Get all assets in Vault
  const args = {
    orderDirection: 'asc',
  };

  const attrs = {
    decimals: true,
    address: true,
  };

  const query = {
    poolTokens: {
      __args: args,
      ...attrs,
    },
  };

  const data = await subgraphClient.get(query);
  const tokenToDecimals = new Map<string, number>();

  const tokenSet = data?.poolTokens.reduce((runningTokenSet, tokenInfo) => {
    runningTokenSet.add(tokenInfo?.address);
    tokenToDecimals.set(tokenInfo?.address, tokenInfo?.decimals);
    return runningTokenSet;
  }, new Set<string>());

  // Get balances for assets in Vault.
  const tokenArray: string[] = Array.from(tokenSet);

  const balances = await Promise.all(
    tokenArray.map((tokenAddress: string) => {
      const tokenContract = new Contract(tokenAddress, ERC20ABI, provider);
      return tokenContract.balanceOf(contracts['Vault'].address);
    })
  );

  const prices = await getCoingeckoSpotPrice(tokenArray);

  const tvlByToken: TVLByToken = tokenArray.reduce((runningTvlByToken: TVLByToken, tokenAddress: string, index) => {
    const balance = formatUnits(balances[index], tokenToDecimals.get(tokenAddress));
    const value = parseFloat(balance) * prices[tokenAddress];
    runningTvlByToken[tokenAddress] = value;
    return runningTvlByToken;
  }, {} as TVLByToken);

  const tvl = Object.values(tvlByToken).reduce((sum, tokenTvl) => {
    return sum + tokenTvl;
  }, 0);

  return tvl;
};

type TVLByToken = {
  [tokenAddress: string]: number;
};
