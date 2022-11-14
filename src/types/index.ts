import { BigNumber, BigNumberish } from 'ethers';

export enum SwapKind {
  GIVEN_IN,
  GIVEN_OUT,
}

export type SwapRequestRequiredParameters = {
  kind: SwapKind;
  tokenIn: string;
  tokenOut: string;
  amount: BigNumberish;
};

export type SwapRequest = {
  kind: SwapKind;
  tokenIn: string;
  tokenOut: string;
  amount: BigNumberish;
  poolId: string;
  lastChangeBlock: BigNumberish;
  from: string;
  to: string;
  userData: string;
};

export type OnSwapParameters = {
  request: SwapRequest;
  balanceTokenIn: BigNumberish;
  balanceTokenOut: BigNumberish;
};

export type PoolInfo = {
  tokens: string[];
  balances: BigNumber[];
  lastChangeBlock: BigNumber;
};

export type SwapInfo = {
  description: string;
  tokenIn: string;
  tokenOut: string;
  decimalsIn: number;
  decimalsOut: number;
  rate: number;
};
