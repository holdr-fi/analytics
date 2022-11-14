import { getLBPTimeRemaining, getLBPPrice } from './functions';

export const getLBPTimeRemainingHandler = async function getLBPTimeRemainingHanlder(event) {
  try {
    console.time('getLBPTimeRemaining');
    const timeRemaining = await getLBPTimeRemaining();
    console.timeEnd('getLBPTimeRemaining');
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(timeRemaining),
    };
  } catch (e) {
    console.error(e);
    return {
      statusCode: 400,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: 'getLBPTimeRemainingHandler error',
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
