import { getLBPEndTime, getLBPPrices, getLBPTokensRemaining } from './functions';

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

export const getLBPPricesHandler = async function getLBPPricesHandler(event) {
  try {
    console.time('getLBPPrices');
    const data = await getLBPPrices();
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
      body: 'getLBPPricesHandler error',
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
