import {ethers} from 'ethers';
import {getObservations, getSlot0, pow10} from '.';
import {ETHEREUM_POOLS, TOKEN_DECIMALS} from './constants';
import {envs} from './environments';
import {UniswapV3Pool, UniswapV3Pool__factory} from './types/typechain';

const data = [
  '1947190135596116643105012955343677',
  '1934408072803905208528569541795291',
  '1871239330486359250541270988629152',
  '1873980698670423991618677034984331',
  '1900208448778783664358374189095735',
  '1863666364734365521200866758533019',
  '1900202088374900935198847003810870',
  '1858311781956828194829595246686093',
  '1893273252395650042096091465268344',
  '1896688530150412870335396700065050',
  '1880114351229156521978360667951417',
  '1912434424720219251411580131525894',
  '1881212128746955354318228446692824',
  '1871537356118821631957598199283945',
  '1870134621464909135113787605137225',
  '1855710741410229384599998387436812',
  '1856231910355225794667818475577682',
  '1869788758497611233971922795226931',
  '1862245954193022308918109577647899',
  '1831235474446978573291656977492122',
  '1812641542862295485136318905665923',
  '1831057829124141590524713540032504',
  '1834154836870436137744826670979979',
  '1841832726509899909709234080730441',
  '1836452286335257625398818277621450',
  '1812280174646684759881887972015483',
  '1821370460729159092689966029903764',
  '1808533294477875934296290410530008',
];

const {providerUrl} = envs;
const decs = TOKEN_DECIMALS;

// parameters
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

const mainTemp2 = async () => {
  const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
  const pool = UniswapV3Pool__factory.connect(poolAddr || '', provider);

  console.log('--- Prices ---');
  for (const datum of data) {
    console.log(
      getExchangeRate({
        sqrtPriceX96: ethers.BigNumber.from(datum),
        precision: 18,
        leftDecs,
        rightDecs,
      })
    );
  }
};

mainTemp2()
  .then(_ => console.log('Success!!'))
  .catch(_ => console.error('Failure!!'));
