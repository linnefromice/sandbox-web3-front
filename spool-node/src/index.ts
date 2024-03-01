import {ethers} from 'ethers';
import {formatEther} from 'ethers/lib/utils';
import {envs} from '../src/environments';
import {SpoolLens__factory} from './types/typechain';

const {providerUrl} = envs;

const main = async () => {
  const provider = new ethers.providers.JsonRpcProvider(
    'https://eth.llamarpc.com' // providerUrl.ethereum
  );

  // const token = ERC20__factory.connect(
  //   '0x6b175474e89094c44da98b954eedeac495271d0f', // DAI
  //   provider
  // );
  // console.log(await token.name());
  // console.log(await token.symbol());

  const contract = SpoolLens__factory.connect(
    '0x8aa6174333F75421903b2B5c70DdF8DA5D84f74F', // SpoolLens
    provider
  );

  const weth = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2';
  const totalSupply = await contract.getSVTTotalSupply(weth);
  console.log(`totalSupply: ${formatEther(totalSupply)}`);

  const totalSupplyByStatic = await contract.callStatic.getSVTTotalSupply(weth);
  console.log(`totalSupply by staticcall: ${formatEther(totalSupplyByStatic)}`);

  const balances = await contract.callStatic
    .getSmartVaultAssetBalances(weth, false)
    .catch(e => {
      console.log(
        `Fail to getSmartVaultAssetBalances with doFlush=false: ${weth}`
      );
      console.error(e);
      return [];
    });
  console.log(balances.map(b => formatEther(b)));

  const balances2 = await contract.callStatic
    .getSmartVaultAssetBalances(weth, true)
    .catch(e => {
      console.log(
        `Fail to getSmartVaultAssetBalances with doFlush=true: ${weth}`
      );
      console.error(e);
      return [];
    });
  console.log(balances2.map(b => formatEther(b)));
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
