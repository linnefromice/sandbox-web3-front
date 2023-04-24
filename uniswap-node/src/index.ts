import {ethers} from 'ethers';
import {envs} from '../src/environments';
import {ETHEREUM_POOLS} from './constants';
import {UniswapV3Pool__factory} from './types/typechain';

const {providerUrl} = envs;

const main = async () => {
  const provider = new ethers.providers.JsonRpcProvider(providerUrl.ethereum);
  const pool = UniswapV3Pool__factory.connect(
    ETHEREUM_POOLS.dai_usdc_001 || '',
    // ETHEREUM_POOLS.usdc_eth_005 || '',
    provider
  );

  // https://docs.uniswap.org/concepts/protocol/oracle#observations
  // https://docs.uniswap.org/contracts/v3/reference/core/UniswapV3Pool#observe
  // https://etherscan.io/address/0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640#readContract
  // https://etherscan.io/address/0x5777d92f208679db4b9778590fa3cab3ac9e2168#readContract
  const observe = await pool.observe([0]);
  console.log({
    tickCumulatives: observe.tickCumulatives.toString(),
    secondsPerLiquidityCumulativeX128s:
      observe.secondsPerLiquidityCumulativeX128s.toString(),
  });
};

main()
  .then(_ => console.log('Success!!'))
  .catch(_ => console.error('Failure!!'));
