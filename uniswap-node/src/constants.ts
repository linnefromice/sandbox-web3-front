import {
  AddressType,
  ChainsInfoType,
  PoolInfoType,
  TokenInfoType,
} from './types';

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

// token0, token1, fee
export const POOL_SYMBOLS = [
  'usdc_eth_005',
  'dai_usdc_001',
  'matic_eth_030',
  'link_eth_030',
] as const;

const MULTICALL2_ADDR: AddressType =
  '0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696';
export const MULTICALL_ADDRS: ChainsInfoType<AddressType | null> = {
  ethereum: MULTICALL2_ADDR,
  polygon: '0xa1B2b503959aedD81512C37e9dce48164ec6a94d',
  optimism: null,
  arbitrum: '0x842eC2c7D803033Edf55E478F461FC547Bc54EB2',
  bnb: null,
};
export const TOKEN_DECIMALS: TokenInfoType<number> = {
  weth: 18,
  wbtc: 8,
  usdc: 6,
  usdt: 6,
  dai: 18,
  matic: 18,
  link: 18,
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
export const OPTIMISM_TOKENS: TokenInfoType<AddressType | null> = {
  weth: '0x4200000000000000000000000000000000000006',
  wbtc: '0x68f180fcce6836688e9084f035309e29bf0a2095',
  usdc: '0x7f5c764cbc14f9669b88837ca1490cca17c31607',
  usdt: '0x94b008aa00579c1307b0ef2c499ad98a8ce58e58',
  dai: '0xda10009cbd5d07dd0cecc66161fc93d7c9000da1',
  matic: null,
  link: '0x350a791bfc2c21f9ed5d10980dad2e2638ffa7f6',
};
export const ARBITRUM_TOKENS: TokenInfoType<AddressType | null> = {
  weth: '0x82af49447d8a07e3bd95bd0d56f35241523fbab1',
  wbtc: '0x2f2a2543b76a4166549f7aab2e75bef0aefc5b0f',
  usdc: '0xff970a61a04b1ca14834a43f5de4533ebddb5cc8',
  usdt: '0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9',
  dai: '0xda10009cbd5d07dd0cecc66161fc93d7c9000da1',
  matic: null,
  link: '0xf97f4df75117a78c1a5a0dbb814af92458539fb4',
};

const V3FACTORY_ADDR: AddressType =
  '0x1f98431c8ad98523631ae4a59f267346ea31f984';
export const V3FACTORY_ADDRS: ChainsInfoType<AddressType | null> = {
  ethereum: V3FACTORY_ADDR,
  polygon: V3FACTORY_ADDR,
  optimism: V3FACTORY_ADDR,
  arbitrum: V3FACTORY_ADDR,
  bnb: null,
};
export const ETHEREUM_POOLS: PoolInfoType<AddressType | null> = {
  usdc_eth_005: '0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640',
  dai_usdc_001: '0x5777d92f208679db4b9778590fa3cab3ac9e2168',
  matic_eth_030: '0x290a6a7460b308ee3f19023d2d00de604bcf5b42',
  link_eth_030: '0xa6cc3c2531fdaa6ae1a3ca84c2855806728693e8',
};
export const POLYGON_POOLS: PoolInfoType<AddressType | null> = {
  usdc_eth_005: '0x45dda9cb7c25131df268515131f647d726f50608',
  dai_usdc_001: '0x5645dcb64c059aa11212707fbf4e7f984440a8cf',
  matic_eth_030: '0x167384319b41f7094e62f7506409eb38079abff8',
  link_eth_030: '0x3e31ab7f37c048fc6574189135d108df80f0ea26',
};
