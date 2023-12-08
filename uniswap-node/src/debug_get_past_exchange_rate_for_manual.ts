import {ethers} from 'ethers';
import {getObservations, getSlot0, pow10} from '.';
import {OPTIMISM_POOLS, TOKEN_DECIMALS} from './constants';
import {envs} from './environments';
import {UniswapV3Pool, UniswapV3Pool__factory} from './types/typechain';

const {providerUrl} = envs;
const decs = TOKEN_DECIMALS;

// parameters
const poolAddr = OPTIMISM_POOLS.usdc_eth_005;
const rpcUrl = providerUrl.optimism;
const leftDecs = decs.weth;
const rightDecs = decs.usdc;

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

const getExchangeRate = ({
  sqrtPriceX96,
  precision,
  leftDecs,
  rightDecs,
}: {
  sqrtPriceX96: ethers.BigNumber;
  precision: number;
  leftDecs: number;
  rightDecs: number;
}) => {
  return calculatePriceBySqrtPriceX96({
    sqrtPriceX96,
    precision,
  })
    .mul(pow10(leftDecs))
    .div(pow10(rightDecs))
    .toString();
};

const getRateInfo = async (
  pool: UniswapV3Pool,
  blockTag: number,
  leftDecs: number,
  rightDecs: number
) => {
  const slot0 = await getSlot0(pool, blockTag);
  const observation = await getObservations(
    pool,
    slot0.observationIndex,
    blockTag
  );

  const observationBlockTimestampStr = new Date(
    observation.blockTimestamp * 1000
  ).toISOString();
  return {
    observationBlockTimestamp: observation.blockTimestamp,
    observationBlockTimestampStr,
    sqrtPriceX96: slot0.sqrtPriceX96.toString(),
    exchange_rate: getExchangeRate({
      sqrtPriceX96: slot0.sqrtPriceX96,
      precision: 18,
      leftDecs,
      rightDecs,
    }),
  };
};

const mainGetPastExchangeRateForManual = async () => {
  const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
  const pool = UniswapV3Pool__factory.connect(poolAddr || '', provider);

  const baseBlockNumbers: number[] = [95600753];
  const diffs = [0];
  for await (const blockNumber of baseBlockNumbers) {
    console.log(`${blockNumber} -------------------`);
    for await (const diff of diffs) {
      const bn = blockNumber + diff;
      const rate = await getRateInfo(pool, bn, leftDecs, rightDecs);
      console.log({
        selectedBn: bn,
        ...rate,
      });
    }
  }
};

mainGetPastExchangeRateForManual()
  .then(_ => console.log('Success!!'))
  .catch(_ => console.error('Failure!!'));
