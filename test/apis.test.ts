import { getLBPEndTime, getLBPPrices, getLBPTokensRemaining } from '../src/functions';
import {
  getCoingeckoSpotPriceForPlatformId,
  getCoingeckoHistoricalPricesForToken,
  getBlockForTimestamp,
} from '../src/utils';
import { expect } from 'chai';

describe('API endpoints', async () => {
  describe('#getLBPEndTime()', async () => {
    it('', async () => {
      const data = await getLBPEndTime();
      console.log(data);
      return;
    }).timeout(10000);
  });

  describe('#getLBPPrices()', async () => {
    it('', async () => {
      const data = await getLBPPrices();
      console.log(data);
      return;
    }).timeout(10000);
  });

  describe('#getLBPTokensRemaining()', async () => {
    it('', async () => {
      const data = await getLBPTokensRemaining();
      console.log(data);
      return;
    }).timeout(10000);
  });
});

describe('utils', async () => {
  describe('#getCoingeckoSpotPriceForPlatformId()', async () => {
    it('Test for USDC, wBTC, UNI and random address', async () => {
      const data = await getCoingeckoSpotPriceForPlatformId(
        [
          '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
          '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
          '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
          '0x473780deAF4a2Ac070BBbA936B0cdefe7F267dFc',
        ],
        'ethereum'
      );
      console.log(data);
      return;
    }).timeout(10000);
  });

  describe('#getCoingeckoHistoricalPricesForToken()', async () => {
    it('Test for wETH', async () => {
      const data = await getCoingeckoHistoricalPricesForToken(
        '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        'ethereum',
        1667984228,
        1669012000
      );
      console.log(`Returned ${data.length} price points`);
      // console.log(data.slice(0, 10));
      return;
    }).timeout(10000);

    it('Test for non-existent token', async () => {
      const data = await getCoingeckoHistoricalPricesForToken(
        '0x473780deAF4a2Ac070BBbA936B0cdefe7F267dFc',
        'ethereum',
        1667984228,
        1669012000
      );
      expect(data).to.deep.equal([]);
      return;
    }).timeout(10000);
  });

  describe('#getBlockForTimestamp()', async () => {
    it('Should fail if timestamp > current timestamp', async () => {
      try {
        await getBlockForTimestamp(2669019387);
      } catch (e) {
        expect(e.message).eq('Cannot get block for timestamp in the future');
      }
      return;
    }).timeout(10000);

    it('Should return if timestamp < current timestamp', async () => {
      const data = await getBlockForTimestamp(1660000000);
      console.log(data);
      return;
    }).timeout(10000);
  });
});
