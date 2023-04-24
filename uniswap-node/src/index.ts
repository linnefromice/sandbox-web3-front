import {ethers} from 'ethers';
import {envs} from '../src/environments';
import {ETHEREUM_POOLS, TOKEN_DECIMALS} from './constants';
import {UniswapV3Pool, UniswapV3Pool__factory} from './types/typechain';

const {providerUrl} = envs;

const getObserves = async (pool: UniswapV3Pool) => {
  const observe = await pool.observe([0]);

  // https://docs.uniswap.org/concepts/protocol/oracle#observations
  // https://docs.uniswap.org/contracts/v3/reference/core/UniswapV3Pool#observe
  // https://etherscan.io/address/0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640#readContract
  // https://etherscan.io/address/0x5777d92f208679db4b9778590fa3cab3ac9e2168#readContract
  return {
    tickCumulatives: observe.tickCumulatives.toString(),
    secondsPerLiquidityCumulativeX128s:
      observe.secondsPerLiquidityCumulativeX128s.toString(),
  };
};

const getSlot0 = async (pool: UniswapV3Pool) => {
  const v = await pool.slot0();
  return {
    sqrtPriceX96: v.sqrtPriceX96,
    tick: v.tick,
    observationIndex: v.observationIndex,
    observationCardinality: v.observationCardinality,
    observationCardinalityNext: v.observationCardinalityNext,
    feeProtocol: v.feeProtocol,
    unlocked: v.unlocked,
  };
};

const calculatePrice = async ({
  pool,
  precision,
}: {
  pool: UniswapV3Pool;
  precision: number;
}) => {
  const slot0 = await getSlot0(pool);
  const sqrtPriceX96 = slot0.sqrtPriceX96;
  const price = sqrtPriceX96
    .mul(sqrtPriceX96)
    .mul(ethers.BigNumber.from(10).pow(precision))
    .div(ethers.BigNumber.from(2).pow(192));
  return price;
};

const pow10 = (n: ethers.BigNumberish) => ethers.BigNumber.from(10).pow(n);

const main = async () => {
  const provider = new ethers.providers.JsonRpcProvider(providerUrl.ethereum);
  const decs = TOKEN_DECIMALS;

  console.log(`> usdc_eth_005`);
  console.log(
    (
      await calculatePrice({
        pool: UniswapV3Pool__factory.connect(
          ETHEREUM_POOLS.usdc_eth_005 || '',
          provider
        ),
        precision: 18,
      })
    )
      .mul(pow10(decs.usdc))
      .div(pow10(decs.weth))
      .toString()
  );
  console.log(`> dai_usdc_001`);
  console.log(
    (
      await calculatePrice({
        pool: UniswapV3Pool__factory.connect(
          ETHEREUM_POOLS.dai_usdc_001 || '',
          provider
        ),
        precision: 18,
      })
    )
      .mul(pow10(decs.dai))
      .div(pow10(decs.usdc))
      .toString()
  );
  console.log(`> matic_eth_030`);
  console.log(
    (
      await calculatePrice({
        pool: UniswapV3Pool__factory.connect(
          ETHEREUM_POOLS.matic_eth_030 || '',
          provider
        ),
        precision: 18,
      })
    )
      .mul(pow10(decs.matic))
      .div(pow10(decs.weth))
      .toString()
  );
};

main()
  .then(_ => console.log('Success!!'))
  .catch(_ => console.error('Failure!!'));
