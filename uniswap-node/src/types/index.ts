import {CHAINS, POOL_SYMBOLS, TOKEN_SYMBOLS} from '../constants';

export type ChainType = (typeof CHAINS)[number];
export type ChainsInfoType<T> = {
  [K in ChainType]: T;
};
export type TokenType = (typeof TOKEN_SYMBOLS)[number];
export type TokenInfoType<T> = {
  [K in TokenType]: T;
};
export type PoolType = (typeof POOL_SYMBOLS)[number];
export type PoolInfoType<T> = {
  [K in PoolType]: T;
};
export type AddressType = `0x${string}`;
