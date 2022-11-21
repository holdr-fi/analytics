import axios from 'axios';
import { getPlatformId } from './';

export const getCoingeckoSpotPrice = async function getCoingeckoSpotPrice(
  tokenAddresses: string[]
): Promise<SpotPriceData> {
  const platformId = getPlatformId();

  if (platformId === '') {
    return tokenAddresses.reduce((runningPriceData, tokenAddr) => {
      runningPriceData[tokenAddr] = 0;
      return runningPriceData;
    }, {} as SpotPriceData);
  } else {
    return await getCoingeckoSpotPriceForPlatformId(tokenAddresses, platformId);
  }
};

export const getCoingeckoSpotPriceForPlatformId = async function getCoingeckoSpotPriceForPlatformId(
  tokenAddresses: string[],
  platformId: string
): Promise<SpotPriceData> {
  // Build `contract_addresses` argument for API request
  let contractsStr = '';
  for (let i = 0; i < tokenAddresses.length; i++) {
    contractsStr += tokenAddresses[i];
    if (i < tokenAddresses.length - 1) {
      contractsStr += ',';
    }
  }

  const { data: coingeckoData } = (await axios.get(
    `https://api.coingecko.com/api/v3/simple/token_price/${platformId}`,
    {
      params: {
        contract_addresses: contractsStr,
        vs_currencies: 'usd',
      },
    }
  )) as { data: CoingeckoSimpleTokenPriceResponse };

  // If Coingecko response includes price for provided token address, provide it. Otherwise, return 0.
  return tokenAddresses.reduce((runningPriceData, tokenAddr) => {
    runningPriceData[tokenAddr] = Object.prototype.hasOwnProperty.call(coingeckoData, tokenAddr.toLowerCase())
      ? coingeckoData[tokenAddr.toLowerCase()]['usd']
      : 0;
    return runningPriceData;
  }, {} as SpotPriceData);
};

type CoingeckoSimpleTokenPriceResponse = {
  [tokenAddress: string]: {
    [currency: string]: number;
  };
};

type SpotPriceData = {
  [tokenAddress: string]: number;
};
