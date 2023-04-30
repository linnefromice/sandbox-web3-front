import {ethers} from 'ethers';
import {envs} from '../src/environments';
import {ETHEREUM_POOLS, TOKEN_DECIMALS} from './constants';
import {UniswapV3Pool, UniswapV3Pool__factory} from './types/typechain';

const {providerUrl} = envs;

const getObservations = async (
  pool: UniswapV3Pool,
  observationIndex: number,
  blockTag?: ethers.providers.BlockTag
) => {
  const observation = blockTag
    ? await pool.observations(observationIndex, {blockTag})
    : await pool.observations(observationIndex);

  // https://docs.uniswap.org/concepts/protocol/oracle#observations
  // https://docs.uniswap.org/contracts/v3/reference/core/UniswapV3Pool#observe
  // https://etherscan.io/address/0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640#readContract
  // https://etherscan.io/address/0x5777d92f208679db4b9778590fa3cab3ac9e2168#readContract
  return observation;
};

const getSlot0 = async (
  pool: UniswapV3Pool,
  blockTag?: ethers.providers.BlockTag
) => {
  const v = blockTag ? await pool.slot0({blockTag}) : await pool.slot0();
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
  blockTag,
}: {
  pool: UniswapV3Pool;
  precision: number;
  blockTag?: ethers.providers.BlockTag;
}) => {
  const slot0 = blockTag
    ? await getSlot0(pool, blockTag)
    : await getSlot0(pool);
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
  console.log(`> 13916166`);
  console.log(
    (
      await calculatePrice({
        pool: UniswapV3Pool__factory.connect(
          ETHEREUM_POOLS.usdc_eth_005 || '',
          provider
        ),
        precision: 18,
        blockTag: 13916166,
      })
    )
      .mul(pow10(decs.usdc))
      .div(pow10(decs.weth))
      .toString()
  );
  console.log(`> 16308190`);
  console.log(
    (
      await calculatePrice({
        pool: UniswapV3Pool__factory.connect(
          ETHEREUM_POOLS.usdc_eth_005 || '',
          provider
        ),
        precision: 18,
        blockTag: 16308190,
      })
    )
      .mul(pow10(decs.usdc))
      .div(pow10(decs.weth))
      .toString()
  );
  console.log(`> 16530248`);
  console.log(
    (
      await calculatePrice({
        pool: UniswapV3Pool__factory.connect(
          ETHEREUM_POOLS.usdc_eth_005 || '',
          provider
        ),
        precision: 18,
        blockTag: 16530248,
      })
    )
      .mul(pow10(decs.usdc))
      .div(pow10(decs.weth))
      .toString()
  );
  console.log(`> 16730072`);
  console.log(
    (
      await calculatePrice({
        pool: UniswapV3Pool__factory.connect(
          ETHEREUM_POOLS.usdc_eth_005 || '',
          provider
        ),
        precision: 18,
        blockTag: 16730072,
      })
    )
      .mul(pow10(decs.usdc))
      .div(pow10(decs.weth))
      .toString()
  );
  console.log(`> 16950603`);
  console.log(
    (
      await calculatePrice({
        pool: UniswapV3Pool__factory.connect(
          ETHEREUM_POOLS.usdc_eth_005 || '',
          provider
        ),
        precision: 18,
        blockTag: 16950603,
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

const mainGetPastExchangeRate = async () => {
  const provider = new ethers.providers.JsonRpcProvider(providerUrl.ethereum);
  const decs = TOKEN_DECIMALS;
  const pool = UniswapV3Pool__factory.connect(
    ETHEREUM_POOLS.usdc_eth_005 || '',
    provider
  );

  const calculatePriceBySqrtPriceX96 = ({
    sqrtPriceX96,
    precision,
  }: {
    sqrtPriceX96: ethers.BigNumber;
    precision: number;
  }) => {
    const price = sqrtPriceX96
      .mul(sqrtPriceX96)
      .mul(ethers.BigNumber.from(10).pow(precision))
      .div(ethers.BigNumber.from(2).pow(192));
    return price;
  };

  const getPastExchangeRate = ({
    sqrtPriceX96,
    precision,
  }: {
    sqrtPriceX96: ethers.BigNumber;
    precision: number;
  }) => {
    return calculatePriceBySqrtPriceX96({
      sqrtPriceX96,
      precision,
    })
      .mul(pow10(decs.usdc))
      .div(pow10(decs.weth))
      .toString();
  };

  const logPastExchangeRate = async (yyyymmdd: number, blockTag: number) => {
    const slot0 = await getSlot0(pool, blockTag);
    const observation = await getObservations(
      pool,
      slot0.observationIndex,
      blockTag
    );
    console.log(
      `${yyyymmdd}: ${new Date(
        observation.blockTimestamp * 1000
      ).toISOString()}`
    );
    console.log(
      getPastExchangeRate({
        sqrtPriceX96: slot0.sqrtPriceX96,
        precision: 18,
      })
    );
  };

  await logPastExchangeRate(20220101, 13916166);
  await logPastExchangeRate(20230101, 16308190);
  await logPastExchangeRate(20230201, 16530248);
  await logPastExchangeRate(20230301, 16730072);
  await logPastExchangeRate(20230401, 16950603);
};

mainGetPastExchangeRate()
  .then(_ => console.log('Success!!'))
  .catch(_ => console.error('Failure!!'));
