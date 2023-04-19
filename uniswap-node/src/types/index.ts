import {CHAINS, TOKEN_SYMBOLS} from '../constants';

export type ChainType = (typeof CHAINS)[number];
export type ChainsInfoType<T> = {
  [K in ChainType]: T;
};
export type TokenType = (typeof TOKEN_SYMBOLS)[number];
export type TokenInfoType<T> = {
  [K in TokenType]: T;
};
export type AddressType = `0x${string}`;
