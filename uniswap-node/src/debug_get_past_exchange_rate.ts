import {parse, stringify} from 'csv';
import {ethers} from 'ethers';
import * as fs from 'fs';
import {getObservations, getSlot0, pow10} from '.';
import {ETHEREUM_POOLS, TOKEN_DECIMALS} from './constants';
import {envs} from './environments';
import {UniswapV3Pool, UniswapV3Pool__factory} from './types/typechain';

type InputData = {
  keyDate: string;
  blockNumber: number;
  blockTimestamp: number;
  blockTimestampStr: string;
  error: string;
};
type OutputData = {
  keyDate: string;
  blockNumber: number;
  blockTimestamp: number;
  blockTimestampStr: string;
  observationBlockTimestamp: number;
  observationBlockTimestampStr: string;
  sqrtPriceX96: string;
  exchange_rate: string;
};

const {providerUrl} = envs;
const decs = TOKEN_DECIMALS;

// parameters
const csvFilePath = './data/data-blockNumber-ethereum-hourly-20230508.csv';
const outCsvFilePath =
  './data/data-exchangeRate-ethereum-usdceth005-for-day-20230508.csv';
const poolAddr = ETHEREUM_POOLS.usdc_eth_005;
const rpcUrl = providerUrl.ethereum;
const leftDecs = decs.usdc;
const rightDecs = decs.weth;

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

const mainGetPastExchangeRate = async () => {
  const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
  const pool = UniswapV3Pool__factory.connect(poolAddr || '', provider);

  const readStream = fs.createReadStream(csvFilePath);
  const parser = parse({delimiter: ','});
  const inputs: InputData[] = [];

  parser.on('readable', () => {
    let row: any[];
    while ((row = parser.read())) {
      const inputData: InputData = {
        keyDate: row[0],
        blockNumber: Number(row[1]),
        blockTimestamp: Number(row[2]),
        blockTimestampStr: row[3],
        error: row[4],
      };
      inputs.push(inputData);
    }
  });

  parser.on('error', err => console.error(err));

  // Handle the end of parsing
  parser.on('end', async () => {
    const outputs: OutputData[] = [];

    for (let i = 0; i < inputs.length; i++) {
      const input = inputs[i];

      console.log(`>> Start ${i}: ${input.keyDate}`);
      console.log(input.blockNumber);
      if (input.error != '' || Number.isNaN(input.blockNumber)) {
        outputs.push({
          ...input,
          observationBlockTimestamp: 0,
          observationBlockTimestampStr: '',
          sqrtPriceX96: '',
          exchange_rate: '',
        });
      } else {
        const info = await getRateInfo(
          pool,
          input.blockNumber,
          leftDecs,
          rightDecs
        );
        outputs.push({
          ...input,
          ...info,
        });
      }

      console.log(`>>>> End ${i}: ${input.keyDate}`);
    }

    stringify(outputs, {header: true}, (err, outputString) => {
      // console.log(outputString);
      if (err) {
        console.error(err);
      } else {
        fs.writeFileSync(outCsvFilePath, outputString);
      }
    });
  });

  readStream.pipe(parser);
};

mainGetPastExchangeRate()
  .then(_ => console.log('Success!!'))
  .catch(_ => console.error('Failure!!'));
