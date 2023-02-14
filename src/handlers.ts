// TODO - test if handlerWrapper works

import {
  getPoolCount,
  getLPCount,
  getTVL,
  getTokenHolderCount,
  getTokensMinted,
  getTokenHolderAndLPCount,
  get24HSwapVolume,
  get7DSwapVolume,
  getTotalVeHLDR,
  getAverageLockTime,
  getTotalHPT,
  getHPTLocked,
  getPercentageHPTLocked,
  getHLDRTotalSupply,
  getHLDRCirculatingSupply,
} from './functions';
import { handlerWrapper } from './utils';

export const getPoolCountHandler = handlerWrapper(getPoolCount, 'getPoolCount');
export const getLPCountHandler = handlerWrapper(getLPCount, 'getLPCount');
export const getTVLHandler = handlerWrapper(getTVL, 'getTVL');
export const getTokenHoldersHandler = handlerWrapper(getTokenHolderCount, 'getTokenHolderCount');
export const getTokensMintedHandler = handlerWrapper(getTokensMinted, 'getTokensMinted');
export const getTokenHolderAndLPCountHandler = handlerWrapper(getTokenHolderAndLPCount, 'getTokenHolderAndLPCount');
export const get24HSwapVolumeHandler = handlerWrapper(get24HSwapVolume, 'get24HSwapVolume');
export const get7DSwapVolumeHandler = handlerWrapper(get7DSwapVolume, 'get7DSwapVolume');
export const getTotalVeHLDRHandler = handlerWrapper(getTotalVeHLDR, 'getTotalVeHLDR');
export const getAverageLockTimeHandler = handlerWrapper(getAverageLockTime, 'getAverageLockTime');
export const getTotalHPTHandler = handlerWrapper(getTotalHPT, 'getTotalHPT');
export const getHPTLockedHandler = handlerWrapper(getHPTLocked, 'getHPTLocked');
export const getPercentageHPTLockedHandler = handlerWrapper(getPercentageHPTLocked, 'getPercentageHPTLocked');
export const getHLDRTotalSupplyHandler = handlerWrapper(getHLDRTotalSupply, 'getHLDRTotalSupply');
export const getHLDRCirculatingSupplyHandler = handlerWrapper(getHLDRCirculatingSupply, 'getHLDRCirculatingSupply');
