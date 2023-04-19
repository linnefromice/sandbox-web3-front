import {AddressType} from '../types';
import {ERC20__factory, Multicall2} from '../types/typechain';

export type TokenMetadataType = {
  name: string;
  symbol: string;
  decimals: number;
};
export const getTokenMetadatas = async (
  tokens: {[key in string]: AddressType},
  multicall: Multicall2
): Promise<{[key in string]: TokenMetadataType}> => {
  const iERC20 = ERC20__factory.createInterface();
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
    obj[key] = {
      name: iERC20.decodeFunctionResult('name', chunk[0])[0],
      symbol: iERC20.decodeFunctionResult('symbol', chunk[1])[0],
      decimals: iERC20.decodeFunctionResult('decimals', chunk[2])[0],
    };
    return obj;
  }, {} as {[key in string]: TokenMetadataType});
  return results;
};
