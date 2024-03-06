import {BigNumber, ethers} from 'ethers';
import {formatEther} from 'ethers/lib/utils';
import {envs} from './environments';
import {
  EACAggregatorProxy__factory,
  SpoolLens__factory,
} from './types/typechain';

const {providerUrl} = envs;

const main = async () => {
  const provider = new ethers.providers.JsonRpcProvider(
    'https://eth.llamarpc.com' // providerUrl.ethereum
  );

  const spoolLensAddr = '0x8aa6174333F75421903b2B5c70DdF8DA5D84f74F';
  const contractSpoolLens = SpoolLens__factory.connect(spoolLensAddr, provider);

  // const weth = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2';
  const vaultSrETH = '0x5d6ac99835b0dd42ed9ffc606170e59f75a88fde';

  const totalSupply = await contractSpoolLens.getSVTTotalSupply(vaultSrETH);
  const balances =
    await contractSpoolLens.callStatic.getSmartVaultAssetBalances(
      vaultSrETH,
      false
    );

  const ETHUSDPriceFeed = '0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419';
  const contractAggregator = EACAggregatorProxy__factory.connect(
    ETHUSDPriceFeed,
    provider
  );
  const rawPrice = await contractAggregator.latestAnswer();
  const decimals = await contractAggregator.decimals();
  const price = rawPrice.div(BigNumber.from(10).pow(decimals));

  console.log(`totalSupply: ${formatEther(totalSupply)}`);
  console.log(`balances: ${balances.map(b => formatEther(b))}`);
  console.log(`rawPrice: ${rawPrice}`);
  console.log(`price: ${price}`);
  // Val SVT = price * balances[0] / totalSupply
};

main()
  .then(_ => {
    console.log('Success!!');
    process.exit(0);
  })
  .catch(_ => {
    console.error('Failure!!');
    process.exit(1);
  });
