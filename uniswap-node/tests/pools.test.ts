import {ethers} from 'ethers';
import {
  ETHEREUM_POOLS,
  ETHEREUM_TOKENS,
  POLYGON_POOLS,
  POLYGON_TOKENS,
  V3FACTORY_ADDRS,
} from '../src/constants';
import {envs} from '../src/environments';
import {AddressType, TokenInfoType} from '../src/types';
import {UniswapV3Factory__factory} from '../src/types/typechain';

const {providerUrl} = envs;

describe('Pools', () => {
  describe('should get pool from factory', () => {
    it(
      'Ethereum',
      async () => {
        const provider = new ethers.providers.JsonRpcProvider(
          providerUrl.ethereum
        );
        const factory = UniswapV3Factory__factory.connect(
          V3FACTORY_ADDRS.ethereum || '',
          provider
        );
        const pools = ETHEREUM_POOLS;
        const {weth, usdc, dai, matic, link} =
          ETHEREUM_TOKENS as TokenInfoType<AddressType>;
        expect((await factory.getPool(usdc, weth, 500)).toLowerCase()).toBe(
          pools.usdc_eth_005
        );
        expect((await factory.getPool(dai, usdc, 100)).toLowerCase()).toBe(
          pools.dai_usdc_001
        );
        expect((await factory.getPool(matic, weth, 3000)).toLowerCase()).toBe(
          pools.matic_eth_030
        );
        expect((await factory.getPool(link, weth, 3000)).toLowerCase()).toBe(
          pools.link_eth_030
        );
      },
      10 * 1000
    );
    it(
      'Polygon',
      async () => {
        const provider = new ethers.providers.JsonRpcProvider(
          providerUrl.polygon
        );
        const factory = UniswapV3Factory__factory.connect(
          V3FACTORY_ADDRS.polygon || '',
          provider
        );
        const pools = POLYGON_POOLS;
        const {weth, usdc, dai, matic, link} =
          POLYGON_TOKENS as TokenInfoType<AddressType>;
        expect((await factory.getPool(usdc, weth, 500)).toLowerCase()).toBe(
          pools.usdc_eth_005
        );
        expect((await factory.getPool(dai, usdc, 100)).toLowerCase()).toBe(
          pools.dai_usdc_001
        );
        expect((await factory.getPool(matic, weth, 3000)).toLowerCase()).toBe(
          pools.matic_eth_030
        );
        expect((await factory.getPool(link, weth, 3000)).toLowerCase()).toBe(
          pools.link_eth_030
        );
      },
      10 * 1000
    );
  });
});
