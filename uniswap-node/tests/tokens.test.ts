import {ethers} from 'ethers';
import {
  ETHEREUM_TOKENS,
  MULTICALL_ADDRS,
  POLYGON_TOKENS,
} from '../src/constants';
import {AddressType, TokenInfoType} from '../src/types';
import {Multicall2__factory} from '../src/types/typechain';
import {TokenMetadataType, getTokenMetadatas} from '../src/utils/contracts';

const tokenMetadatas = async (
  url: string,
  multicallAddr: string,
  tokens: TokenInfoType<AddressType | null>
) => {
  const provider = new ethers.providers.JsonRpcProvider(url);
  const multicall = Multicall2__factory.connect(multicallAddr, provider);

  const targetTokens = Object.entries(tokens).reduce((obj, [key, value]) => {
    if (!value) return obj;
    return Object.assign(obj, {[key]: value});
  }, {} as {[key in string]: AddressType});
  const tokenMetadatas = await getTokenMetadatas(targetTokens, multicall);
  return Object.keys(tokens).reduce((obj, key) => {
    const value = tokenMetadatas[key];
    if (!value) return obj;
    return Object.assign(obj, {[key]: value});
  }, {} as TokenInfoType<TokenMetadataType | null>);
};

describe('Tokens', () => {
  describe("should get tokens' metadatas", () => {
    it('Ethereum', async () => {
      const metadatas = await tokenMetadatas(
        'https://eth-mainnet.alchemyapi.io/v2/JVUDgQSB0r-3HhohPCod6uBy_Zx8WEdy',
        MULTICALL_ADDRS.ethereum || '',
        ETHEREUM_TOKENS
      );
      expect(metadatas).toEqual({
        weth: {name: 'Wrapped Ether', symbol: 'WETH', decimals: 18},
        wbtc: {name: 'Wrapped BTC', symbol: 'WBTC', decimals: 8},
        usdc: {name: 'USD Coin', symbol: 'USDC', decimals: 6},
        usdt: {name: 'Tether USD', symbol: 'USDT', decimals: 6},
        dai: {name: 'Dai Stablecoin', symbol: 'DAI', decimals: 18},
        matic: {name: 'Matic Token', symbol: 'MATIC', decimals: 18},
        link: {name: 'ChainLink Token', symbol: 'LINK', decimals: 18},
      });
    });
    it('Polygon', async () => {
      const metadatas = await tokenMetadatas(
        'https://polygon-mainnet.g.alchemy.com/v2/sLp6VfuskMEwx8Wx0DvaRkI8qCoVYF8f',
        MULTICALL_ADDRS.polygon || '',
        POLYGON_TOKENS
      );
      expect(metadatas).toEqual({
        weth: {name: 'Wrapped Ether', symbol: 'WETH', decimals: 18},
        wbtc: {name: '(PoS) Wrapped BTC', symbol: 'WBTC', decimals: 8},
        usdc: {name: 'USD Coin (PoS)', symbol: 'USDC', decimals: 6},
        usdt: {name: '(PoS) Tether USD', symbol: 'USDT', decimals: 6},
        dai: {name: '(PoS) Dai Stablecoin', symbol: 'DAI', decimals: 18},
        matic: {name: 'Wrapped Matic', symbol: 'WMATIC', decimals: 18},
        link: {name: 'ChainLink Token', symbol: 'LINK', decimals: 18},
      });
    });
  });
});
