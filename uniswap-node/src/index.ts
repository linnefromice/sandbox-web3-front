import {ethers} from 'ethers';
import {ETHEREUM_TOKENS, MULTICALL_ADDRS} from './constants';
import {TokenInfoType, TokenType} from './types';
import {ERC20__factory, Multicall2__factory} from './types/typechain';

const main = async () => {
  // sample: get metatada of tokens
  const provider = new ethers.providers.JsonRpcProvider(
    'https://eth-mainnet.g.alchemy.com/v2/JVUDgQSB0r-3HhohPCod6uBy_Zx8WEdy'
  );
  const multicallAddr = MULTICALL_ADDRS.ethereum;
  if (!multicallAddr) throw new Error('Multicall address not found');
  const multicall = Multicall2__factory.connect(multicallAddr, provider);
  const iERC20 = ERC20__factory.createInterface();
  const tokens = ETHEREUM_TOKENS;
  const calls = Object.entries(tokens)
    .map(([symbol, addr]) => {
      if (!addr) throw new Error(`Token address not found: ${symbol}`);
      return [
        {
          target: addr,
          callData: iERC20.encodeFunctionData('name'),
        },
        {
          target: addr,
          callData: iERC20.encodeFunctionData('symbol'),
        },
        {
          target: addr,
          callData: iERC20.encodeFunctionData('decimals'),
        },
      ];
    })
    .flat();
  const {returnData} = await multicall.callStatic.aggregate(calls);
  const calledFuncCounts = 3;

  const results = Object.keys(tokens).reduce((obj, key, idx) => {
    const from = idx * calledFuncCounts;
    const chunk = returnData.slice(from, from + calledFuncCounts);
    obj[key as TokenType] = {
      name: iERC20.decodeFunctionResult('name', chunk[0])[0],
      symbol: iERC20.decodeFunctionResult('symbol', chunk[1])[0],
      decimals: iERC20.decodeFunctionResult('decimals', chunk[2])[0],
    };
    return obj;
  }, {} as TokenInfoType<any>);
  console.log(results);
};

main()
  .then(_ => console.log('Success!!'))
  .catch(_ => console.error('Failure!!'));
