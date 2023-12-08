import {ethers} from 'ethers';
import {getObservations, getSlot0, pow10} from '.';
import {ETHEREUM_POOLS, TOKEN_DECIMALS} from './constants';
import {envs} from './environments';
import {UniswapV3Pool, UniswapV3Pool__factory} from './types/typechain';

const data = [
  {
    sqrt_price_x96: '1976640369036921309426240806329837',
    observation_index: 407,
    block_timestamp: 1678665635,
  },
  {
    sqrt_price_x96: '1932132232747545556156290513773303',
    observation_index: 261,
    block_timestamp: 1678752155,
  },
  {
    sqrt_price_x96: '1917913805724056920688497825488635',
    observation_index: 612,
    block_timestamp: 1678838471,
  },
  {
    sqrt_price_x96: '1947190135596116643105012955343677',
    observation_index: 672,
    block_timestamp: 1678924823,
  },
  {
    sqrt_price_x96: '1934408072803905208528569541795291',
    observation_index: 507,
    block_timestamp: 1679011271,
  },
  {
    sqrt_price_x96: '1871239330486359250541270988629152',
    observation_index: 391,
    block_timestamp: 1679097623,
  },
  {
    sqrt_price_x96: '1886869749388712440408228066010042',
    observation_index: 41,
    block_timestamp: 1679184035,
  },
  {
    sqrt_price_x96: '1873980698670423991618677034984331',
    observation_index: 41,
    block_timestamp: 1679270435,
  },
  {
    sqrt_price_x96: '1900208448778783664358374189095735',
    observation_index: 453,
    block_timestamp: 1679356871,
  },
  {
    sqrt_price_x96: '1863666364734365521200866758533019',
    observation_index: 528,
    block_timestamp: 1679443211,
  },
  {
    sqrt_price_x96: '1900202088374900935198847003810870',
    observation_index: 20,
    block_timestamp: 1679529611,
  },
  {
    sqrt_price_x96: '1858311781956828194829595246686093',
    observation_index: 33,
    block_timestamp: 1679616071,
  },
  {
    sqrt_price_x96: '1893273252395650042096091465268344',
    observation_index: 634,
    block_timestamp: 1679702531,
  },
  {
    sqrt_price_x96: '1896688530150412870335396700065050',
    observation_index: 525,
    block_timestamp: 1679788883,
  },
  {
    sqrt_price_x96: '1880114351229156521978360667951417',
    observation_index: 394,
    block_timestamp: 1679875295,
  },
  {
    sqrt_price_x96: '1912434424720219251411580131525894',
    observation_index: 597,
    block_timestamp: 1679961647,
  },
  {
    sqrt_price_x96: '1881212128746955354318228446692824',
    observation_index: 87,
    block_timestamp: 1680048011,
  },
  {
    sqrt_price_x96: '1871537356118821631957598199283945',
    observation_index: 198,
    block_timestamp: 1680134699,
  },
  {
    sqrt_price_x96: '1870134621464909135113787605137225',
    observation_index: 208,
    block_timestamp: 1680220979,
  },
  {
    sqrt_price_x96: '1855710741410229384599998387436812',
    observation_index: 182,
    block_timestamp: 1680307223,
  },
  {
    sqrt_price_x96: '1856231910355225794667818475577682',
    observation_index: 347,
    block_timestamp: 1680393839,
  },
  {
    sqrt_price_x96: '1869788758497611233971922795226931',
    observation_index: 548,
    block_timestamp: 1680479951,
  },
  {
    sqrt_price_x96: '1862245954193022308918109577647899',
    observation_index: 679,
    block_timestamp: 1680566279,
  },
  {
    sqrt_price_x96: '1831235474446978573291656977492122',
    observation_index: 60,
    block_timestamp: 1680652811,
  },
  {
    sqrt_price_x96: '1812641542862295485136318905665923',
    observation_index: 227,
    block_timestamp: 1680739259,
  },
  {
    sqrt_price_x96: '1831057829124141590524713540032504',
    observation_index: 65,
    block_timestamp: 1680825563,
  },
  {
    sqrt_price_x96: '1834154836870436137744826670979979',
    observation_index: 337,
    block_timestamp: 1680911939,
  },
  {
    sqrt_price_x96: '1841832726509899909709234080730441',
    observation_index: 268,
    block_timestamp: 1680998123,
  },
  {
    sqrt_price_x96: '1836452286335257625398818277621450',
    observation_index: 499,
    block_timestamp: 1681084763,
  },
  {
    sqrt_price_x96: '1812280174646684759881887972015483',
    observation_index: 191,
    block_timestamp: 1681171163,
  },
  {
    sqrt_price_x96: '1821370460729159092689966029903764',
    observation_index: 143,
    block_timestamp: 1681257803,
  },
  {
    sqrt_price_x96: '1808533294477875934296290410530008',
    observation_index: 318,
    block_timestamp: 1681343927,
  },
  {
    sqrt_price_x96: '1765393089501814904782875822164448',
    observation_index: 572,
    block_timestamp: 1681430387,
  },
  {
    sqrt_price_x96: '1727878856164844135913556309342875',
    observation_index: 561,
    block_timestamp: 1681516859,
  },
  {
    sqrt_price_x96: '1731768705347841942970810044569813',
    observation_index: 225,
    block_timestamp: 1681603223,
  },
  {
    sqrt_price_x96: '1720652475023668573026916116931219',
    observation_index: 653,
    block_timestamp: 1681689743,
  },
  {
    sqrt_price_x96: '1739606498983070759308837788084134',
    observation_index: 618,
    block_timestamp: 1681776167,
  },
  {
    sqrt_price_x96: '1726831144723369965777691999155720',
    observation_index: 388,
    block_timestamp: 1681862351,
  },
  {
    sqrt_price_x96: '1801164700527259232353759517679912',
    observation_index: 674,
    block_timestamp: 1681948823,
  },
  {
    sqrt_price_x96: '1796700888446734047179928981711688',
    observation_index: 284,
    block_timestamp: 1682035331,
  },
  {
    sqrt_price_x96: '1842936106831442726315744699898990',
    observation_index: 88,
    block_timestamp: 1682121623,
  },
  {
    sqrt_price_x96: '1829741462255842839111413295060237',
    observation_index: 359,
    block_timestamp: 1682208035,
  },
  {
    sqrt_price_x96: '1836684533193482176983717085101504',
    observation_index: 636,
    block_timestamp: 1682294447,
  },
  {
    sqrt_price_x96: '1845727599810613399807875789591639',
    observation_index: 645,
    block_timestamp: 1682381183,
  },
  {
    sqrt_price_x96: '1833698817911059004973123421274388',
    observation_index: 622,
    block_timestamp: 1682467211,
  },
  {
    sqrt_price_x96: '1834054392926273118169229282777686',
    observation_index: 377,
    block_timestamp: 1682553551,
  },
  {
    sqrt_price_x96: '1813166736868975676411856758325329',
    observation_index: 44,
    block_timestamp: 1682640119,
  },
  {
    sqrt_price_x96: '1820781896804980708796383536546448',
    observation_index: 480,
    block_timestamp: 1682726111,
  },
  {
    sqrt_price_x96: '1813787337316483356908076663340549',
    observation_index: 472,
    block_timestamp: 1682812991,
  },
  {
    sqrt_price_x96: '1832006235521118161994381634539628',
    observation_index: 21,
    block_timestamp: 1682899235,
  },
  {
    sqrt_price_x96: '1851814295031369524319015992521091',
    observation_index: 198,
    block_timestamp: 1682985635,
  },
  {
    sqrt_price_x96: '1831956650146677449098323451799011',
    observation_index: 601,
    block_timestamp: 1683072179,
  },
  {
    sqrt_price_x96: '1815294831161759095185955387487861',
    observation_index: 463,
    block_timestamp: 1683158567,
  },
  {
    sqrt_price_x96: '1829254089654849497111607808523292',
    observation_index: 142,
    block_timestamp: 1683244967,
  },
  {
    sqrt_price_x96: '1773125103584810693586301798601516',
    observation_index: 230,
    block_timestamp: 1683331331,
  },
  {
    sqrt_price_x96: '1817861375574654530439376477465453',
    observation_index: 397,
    block_timestamp: 1683418067,
  },
  {
    sqrt_price_x96: '1831458783199711406099878242006954',
    observation_index: 86,
    block_timestamp: 1683504023,
  },
  {
    sqrt_price_x96: '1843218982572472513862644519254121',
    observation_index: 472,
    block_timestamp: 1683590411,
  },
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

const mainTemp1 = async () => {
  const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
  const pool = UniswapV3Pool__factory.connect(poolAddr || '', provider);

  console.log('--- Date ---');
  for (const datum of data) {
    console.log(new Date(datum.block_timestamp * 1000).toISOString());
  }
  console.log('--- Prices ---');
  for (const datum of data) {
    console.log(
      getExchangeRate({
        sqrtPriceX96: ethers.BigNumber.from(datum.sqrt_price_x96),
        precision: 18,
        leftDecs,
        rightDecs,
      })
    );
  }
};

mainTemp1()
  .then(_ => console.log('Success!!'))
  .catch(_ => console.error('Failure!!'));
