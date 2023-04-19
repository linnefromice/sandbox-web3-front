import {AddressType, ChainsInfoType, TokenInfoType} from './types';

export const CHAINS = [
  'ethereum',
  'polygon',
  'optimism',
  'arbitrum',
  'bnb',
] as const;
export const TOKEN_SYMBOLS = [
  'weth',
  'wbtc',
  'usdc',
  'usdt',
  'dai',
  'matic',
  'link',
] as const;

const MULTICALL2_ADDR: AddressType =
  '0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696';
export const MULTICALL_ADDRS: ChainsInfoType<AddressType | null> = {
  ethereum: MULTICALL2_ADDR,
  polygon: '0xa1B2b503959aedD81512C37e9dce48164ec6a94d',
  optimism: null,
  arbitrum: null,
  bnb: null,
};
export const ETHEREUM_TOKENS: TokenInfoType<AddressType | null> = {
  weth: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
  wbtc: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
  usdc: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
  usdt: '0xdac17f958d2ee523a2206206994597c13d831ec7',
  dai: '0x6b175474e89094c44da98b954eedeac495271d0f',
  matic: '0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0',
  link: '0x514910771af9ca656af840dff83e8264ecf986ca',
};
export const POLYGON_TOKENS: TokenInfoType<AddressType | null> = {
  weth: '0x7ceb23fd6bc0add59e62ac25578270cff1b9f619',
  wbtc: '0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6', // PoS?
  usdc: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',
  usdt: '0xc2132d05d31c914a87c6611c10748aeb04b58e8f', // PoS?
  dai: '0x8f3cf7ad23cd3cadbd9735aff958023239c6a063', // PoS?
  matic: '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270',
  link: '0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39',
};
