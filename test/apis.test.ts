import { getLBPTimeRemaining, getLBPprice } from '../src/functions';

describe('API endpoints', async () => {
  describe('#getLBPEndTime()', async () => {
    it('', async () => {
      // const data = await getLBPTimeRemaining();
      // console.log(data);
      return;
    }).timeout(10000);
  });

  describe('#getLBPprice()', async () => {
    it('', async () => {
      const data = await getLBPprice();
      console.log(data);
      return;
    }).timeout(10000);
  });
});
