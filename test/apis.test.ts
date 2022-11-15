import { getLBPEndTime, getLBPPrice } from '../src/functions';

describe('API endpoints', async () => {
  describe('#getLBPEndTime()', async () => {
    it('', async () => {
      const data = await getLBPEndTime();
      console.log(data);
      return;
    }).timeout(10000);
  });

  describe('#getLBPprice()', async () => {
    it('', async () => {
      const data = await getLBPPrice();
      console.log(data);
      return;
    }).timeout(10000);
  });
});
