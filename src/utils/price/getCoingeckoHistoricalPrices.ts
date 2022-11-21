import axios from 'axios';
import { getPlatformId } from '.';

export const getCoingeckoHistoricalPrices = async function getCoingeckoHistoricalPrices(
  tokenAddresses: string[],
  startingTimestamp: number,
  endingTimestamp: number
): Promise<HistoricalPriceData> {
  const platformId = getPlatformId();

  if (platformId === '') {
    return tokenAddresses.reduce((runningHistoricalPriceData, tokenAddress) => {
      runningHistoricalPriceData[tokenAddress] = [];
      return runningHistoricalPriceData;
    }, {} as HistoricalPriceData);
  } else {
    const rawHistoricalPrices: number[][][] = await Promise.all(
      tokenAddresses.map((tokenAddress) =>
        getCoingeckoHistoricalPricesForToken(tokenAddress, platformId, startingTimestamp, endingTimestamp)
      )
    );

    const parsedHistoricalPrices: HistoricalPriceData = rawHistoricalPrices.reduce(
      (runningHistoricalPriceData, historicalPriceDataForToken, index) => {
        runningHistoricalPriceData[tokenAddresses[index]] = historicalPriceDataForToken;
        return runningHistoricalPriceData;
      },
      {}
    );

    return parsedHistoricalPrices;
  }
};

/*
  Example response:
  [
    [ 1660003200000, 1.000897821425 ],
    [ 1660089600000, 1.0029526303272513 ]
  ]
*/

export const getCoingeckoHistoricalPricesForToken = async function getCoingeckoHistoricalPricesForToken(
  tokenAddress: string,
  platformId: string,
  startingTimestamp: number,
  endingTimestamp: number
): Promise<number[][]> {
  try {
    const { data: coingeckoData } = (await axios.get(
      `https://api.coingecko.com/api/v3/coins/${platformId}/contract/${tokenAddress}/market_chart/range`,
      {
        params: {
          vs_currency: 'usd',
          from: startingTimestamp,
          to: endingTimestamp,
        },
      }
    )) as { data: CoingeckoContractMarketChartRangeResponse };
    return coingeckoData.prices;
  } catch (e) {
    // Fail gracefully
    return [];
  }
};

type CoingeckoContractMarketChartRangeResponse = {
  prices: number[][];
  market_caps: number[][];
  total_volumes: number[][];
};

type HistoricalPriceData = {
  [tokenAddress: string]: number[][];
};
