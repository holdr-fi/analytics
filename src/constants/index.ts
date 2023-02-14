import { BigNumber } from 'ethers';

export const DAY = 86400;
export const WEEK = 604800;
export const ZERO = BigNumber.from('0');
export const ONE = BigNumber.from(10).pow(18);
export const TEN_BASE = BigNumber.from('10');
export const TEN_THOUSAND = ONE.mul(10000);
export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';
export * from './env';

export const NON_CIRCULATING_HLDR_ADDRESSES = ['0x432Eb1f2730662AD1A9791Ed34CB2DBDf7001555'];
