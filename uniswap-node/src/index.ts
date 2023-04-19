import {ethers} from 'ethers';
import {ETHEREUM_TOKENS, MULTICALL_ADDRS, POLYGON_TOKENS} from './constants';
import {AddressType, TokenInfoType} from './types';
import {Multicall2__factory} from './types/typechain';
import {TokenMetadataType, getTokenMetadatas} from './utils/contracts';

const tokenMetadatas = async (
  url: string,
  multicallAddr: string,
  tokens: TokenInfoType<AddressType | null>
) => {
  const provider = new ethers.providers.JsonRpcProvider(url);
  const multicall = Multicall2__factory.connect(multicallAddr, provider);

  const targetTokens = Object.entries(tokens).reduce((obj, [key, value]) => {
    if (!value) return obj;
    return Object.assign(obj, {[key]: value});
  }, {} as {[key in string]: AddressType});
  const tokenMetadatas = await getTokenMetadatas(targetTokens, multicall);
  return Object.keys(tokens).reduce((obj, key) => {
    const value = tokenMetadatas[key];
    if (!value) return obj;
    return Object.assign(obj, {[key]: value});
  }, {} as TokenInfoType<TokenMetadataType | null>);
};

const main = async () => {
  // sample: get metatada of tokens
  console.log(`> Ethereum`);
  console.log(
    await tokenMetadatas(
      'https://eth-mainnet.alchemyapi.io/v2/JVUDgQSB0r-3HhohPCod6uBy_Zx8WEdy',
      MULTICALL_ADDRS.ethereum || '',
      ETHEREUM_TOKENS
    )
  );

  console.log(`> Polygon`);
  console.log(
    await tokenMetadatas(
      'https://polygon-mainnet.g.alchemy.com/v2/sLp6VfuskMEwx8Wx0DvaRkI8qCoVYF8f',
      MULTICALL_ADDRS.polygon || '',
      POLYGON_TOKENS
    )
  );
};

main()
  .then(_ => console.log('Success!!'))
  .catch(_ => console.error('Failure!!'));
