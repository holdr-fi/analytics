import { getLBPEndTime, getLBPPrice } from './functions';

export const getLBPEndTimeHandler = async function getLBPEndTimeHandler(event) {
  try {
    console.time('getLBPEndTime');
    const endTime = await getLBPEndTime();
    console.timeEnd('getLBPEndTime');
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(endTime),
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

export const getLBPPriceHandler = async function getLBPPriceHandler(event) {
  try {
    console.time('getLBPPrice');
    const price = await getLBPPrice();
    console.timeEnd('getLBPPrice');
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(price),
    };
  } catch (e) {
    console.error(e);
    return {
      statusCode: 400,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: 'getLBPPriceHandler error',
    };
  }
};
