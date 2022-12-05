// TO-DO Test against mainnet logic

import { POOL_SUBGRAPH, ZERO } from '../../constants';
import { SubgraphClient } from '../../utils';
import ERC20ABI from '../../network/abis/ERC20.json';
import { Contract, utils } from 'ethers';
import { contracts, provider } from '../../network';
import { getCoingeckoSpotPrice } from '../../utils';
const subgraphClient = new SubgraphClient(POOL_SUBGRAPH);
const { formatUnits } = utils;

export const getTVL = async function getTVL(): Promise<number> {
  // Get all assets in Vault with >0 balance
  const data = await Promise.all([
    _getTokensQuery(0, 'asc'),
    _getTokensQuery(1000, 'asc'),
    _getTokensQuery(2000, 'asc'),
    _getTokensQuery(3000, 'asc'),
    _getTokensQuery(4000, 'asc'),
    _getTokensQuery(5000, 'asc'),
    _getTokensQuery(0, 'desc'),
    _getTokensQuery(1000, 'desc'),
    _getTokensQuery(2000, 'desc'),
    _getTokensQuery(3000, 'desc'),
    _getTokensQuery(4000, 'desc'),
    _getTokensQuery(5000, 'desc'),
  ]);

  const tokenToDecimals = new Map<string, number>();

  const tokenSet = data.reduce((runningTokenSet: Set<string>, poolTokensCollection) => {
    poolTokensCollection?.poolTokens.reduce((innerTokenSet: Set<string>, tokenInfo) => {
      innerTokenSet.add(tokenInfo?.address);
      tokenToDecimals.set(tokenInfo?.address, tokenInfo?.decimals);
      return innerTokenSet;
    }, runningTokenSet);
    return runningTokenSet;
  }, new Set<string>());

  // Get Coingecko price data for assets.
  const tokenArray: string[] = Array.from(tokenSet);

  // Limit single coingecko query to 100 tokens at a time.
  const pricePromises = [];
  let tokenCount = 0;

  while (tokenCount < tokenArray.length) {
    pricePromises.push(
      getCoingeckoSpotPrice(tokenArray.slice(tokenCount, Math.min(tokenArray.length, tokenCount + 100)))
    );
    tokenCount += 100;
  }

  const priceData = await Promise.all(pricePromises);

  // Filter out coins with invalid price data.
  const filteredPrices: TVLByToken = priceData.reduce((runningPriceData, priceDataFragment) => {
    Object.keys(priceDataFragment).forEach((tokenAddress) => {
      if (priceDataFragment[tokenAddress] !== 0 && priceDataFragment[tokenAddress] !== undefined) {
        runningPriceData[tokenAddress] = priceDataFragment[tokenAddress];
      }
      return;
    });

    return runningPriceData;
  }, {} as TVLByToken);

  const balances = await Promise.all(
    Object.keys(filteredPrices).map((tokenAddress: string) => {
      const tokenContract = new Contract(tokenAddress, ERC20ABI, provider);
      return tokenContract.balanceOf(contracts['Vault'].address);
    })
  );

  const tvlByToken: TVLByToken = Object.keys(filteredPrices).reduce(
    (runningTvlByToken: TVLByToken, tokenAddress: string, index) => {
      if (balances[index] === undefined || filteredPrices[tokenAddress] === undefined || balances[index].eq(ZERO)) {
        return runningTvlByToken;
      }
      const balance = formatUnits(balances[index], tokenToDecimals.get(tokenAddress));
      const value = parseFloat(balance) * filteredPrices[tokenAddress];
      runningTvlByToken[tokenAddress] = value;
      return runningTvlByToken;
    },
    {} as TVLByToken
  );

  const tvl = Object.values(tvlByToken).reduce((sum, tokenTvl) => {
    return sum + tokenTvl;
  }, 0);

  return tvl;
};

const _getTokensQuery = async function _getTokensQuery(skip: number, orderDirection: 'asc' | 'desc') {
  const args = {
    first: 1000,
    skip: skip,
    orderBy: 'balance',
    orderDirection: orderDirection,
    where: { balance_gt: 0 },
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

  return await subgraphClient.get(query);
};

type TVLByToken = {
  [tokenAddress: string]: number;
};
