import { getLBPEndTime, getLBPprice, getLBPHistoricalPrices, getLBPTokensRemaining } from './functions';

export const getLBPEndTimeHandler = async function getLBPEndTimeHandler(event) {
  try {
    console.time('getLBPEndTime');
    const data = await getLBPEndTime();
    console.timeEnd('getLBPEndTime');
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(data),
    };
  } catch (e) {
    console.error(e);
    return {
      statusCode: 400,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: 'getLBPEndTimeHandler error',
    };
  }
};

export const getLBPpriceHandler = async function getLBPpriceHandler(event) {
  try {
    console.time('getLBPprice');
    const data = await getLBPprice();
    console.timeEnd('getLBPprice');
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(data),
    };
  } catch (e) {
    console.error(e);
    return {
      statusCode: 400,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: 'getLBPpriceHandler error',
    };
  }
};

export const getLBPHistoricalPricesHandler = async function getLBPHistoricalPricesHandler(event) {
  try {
    console.time('getLBPPrices');
    const data = await getLBPHistoricalPrices();
    console.timeEnd('getLBPPrices');
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(data),
    };
  } catch (e) {
    console.error(e);
    return {
      statusCode: 400,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: 'getLBPHistoricalPricesHandler error',
    };
  }
};

export const getLBPTokensRemainingHandler = async function getLBPTokensRemainingHandler(event) {
  try {
    console.time('getLBPTokensRemaining');
    const data = await getLBPTokensRemaining();
    console.timeEnd('getLBPTokensRemaining');
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(data),
    };
  } catch (e) {
    console.error(e);
    return {
      statusCode: 400,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: 'getLBPTokensRemainingHandler error',
    };
  }
};
