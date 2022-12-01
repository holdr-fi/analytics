// TODO - test if handlerWrapper works

import {
  getPoolCount,
  getLPCount,
  getTVL,
  getTokenHolders,
  getTokensMinted,
  getTokenHolderAndLPCount,
  get24HSwapVolume,
  get7DSwapVolume,
} from './functions';
import { handlerWrapper } from './utils';

export const getPoolCountHandler = async function getPoolCountHandler(event) {
  try {
    console.time('getPoolCount');
    const data = await getPoolCount();
    console.timeEnd('getPoolCount');
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
      body: 'getPoolCountHandler error',
    };
  }
};

export const getLPCountHandler = async function getLPCountHandler(event) {
  try {
    console.time('getLPCount');
    const data = await getLPCount();
    console.timeEnd('getLPCount');
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
      body: 'getLPCountHandler error',
    };
  }
};

export const getTVLHandler = await handlerWrapper(getTVL, 'getTVL');
export const getTokenHoldersHandler = await handlerWrapper(getTokenHolders, 'getTokenHolders');
export const getTokensMintedHandler = await handlerWrapper(getTokensMinted, 'getTokensMinted');
export const getTokenHolderAndLPCountHandler = await handlerWrapper(
  getTokenHolderAndLPCount,
  'getTokenHolderAndLPCount'
);
export const get24HSwapVolumeHandler = await handlerWrapper(get24HSwapVolume, 'get24HSwapVolume');
export const get7DSwapVolumeHandler = await handlerWrapper(get7DSwapVolume, 'get7DSwapVolume');
