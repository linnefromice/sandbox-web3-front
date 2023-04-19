import {ethers} from 'ethers';
import {
  ARBITRUM_TOKENS,
  ETHEREUM_TOKENS,
  MULTICALL_ADDRS,
  OPTIMISM_TOKENS,
  POLYGON_TOKENS,
} from '../src/constants';
import {AddressType, TokenInfoType} from '../src/types';
import {ERC20__factory, Multicall2__factory} from '../src/types/typechain';
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
    it(
      'Optimism',
      async () => {
        const provider = new ethers.providers.JsonRpcProvider(
          'https://opt-mainnet.g.alchemy.com/v2/Ezm0tB8-gpM3neOBuqw8pUlw5UA-MwFF'
        );

        const _getMetadata = async (_token: AddressType) => {
          const contract = ERC20__factory.connect(_token, provider);
          const [name, symbol, decimals] = await Promise.all([
            contract.name(),
            contract.symbol(),
            contract.decimals(),
          ]);
          return {name, symbol, decimals};
        };

        const tokens = OPTIMISM_TOKENS;
        const results = {
          weth: {name: 'Wrapped Ether', symbol: 'WETH', decimals: 18},
          wbtc: {name: 'Wrapped BTC', symbol: 'WBTC', decimals: 8},
          usdc: {name: 'USD Coin', symbol: 'USDC', decimals: 6},
          usdt: {name: 'Tether USD', symbol: 'USDT', decimals: 6},
          dai: {name: 'Dai Stablecoin', symbol: 'DAI', decimals: 18},
          link: {name: 'ChainLink Token', symbol: 'LINK', decimals: 18},
        };
        expect(await _getMetadata(tokens.weth as AddressType)).toEqual(
          results.weth
        );
        expect(await _getMetadata(tokens.wbtc as AddressType)).toEqual(
          results.wbtc
        );
        expect(await _getMetadata(tokens.usdc as AddressType)).toEqual(
          results.usdc
        );
        expect(await _getMetadata(tokens.usdt as AddressType)).toEqual(
          results.usdt
        );
        expect(await _getMetadata(tokens.dai as AddressType)).toEqual(
          results.dai
        );
        expect(await _getMetadata(tokens.link as AddressType)).toEqual(
          results.link
        );
      },
      10 * 1000
    );
    it('Arbitrum', async () => {
      const metadatas = await tokenMetadatas(
        'https://arb1.arbitrum.io/rpc	',
        MULTICALL_ADDRS.arbitrum || '',
        ARBITRUM_TOKENS
      );
      expect(metadatas).toEqual({
        weth: {name: 'Wrapped Ether', symbol: 'WETH', decimals: 18},
        wbtc: {name: 'Wrapped BTC', symbol: 'WBTC', decimals: 8},
        usdc: {name: 'USD Coin (Arb1)', symbol: 'USDC', decimals: 6},
        usdt: {name: 'Tether USD', symbol: 'USDT', decimals: 6},
        dai: {name: 'Dai Stablecoin', symbol: 'DAI', decimals: 18},
        link: {name: 'ChainLink Token', symbol: 'LINK', decimals: 18},
      });
    });
  });
});
