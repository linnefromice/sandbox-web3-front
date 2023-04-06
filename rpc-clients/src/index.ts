import { AbiCoder, keccak256 } from "ethers"
const axios = require('axios')
const Web3 = require('web3');

// const generateDataFromEthers = (signature: string) => {
//   const abiCoder = new AbiCoder();
//   const hash = keccak256(abiCoder.encode(["string"], [signature]));
//   return hash + "0".repeat(64);
// }

const generateDataFromWeb3 = (signature: string): string => {
  const web3 = new Web3("https://polygon-mainnet.g.alchemy.com/v2/sLp6VfuskMEwx8Wx0DvaRkI8qCoVYF8f")
  return web3.eth.abi.encodeFunctionSignature(signature) as string
}

const callEth_call = async ({ endpoint, to, data }: { endpoint: string, to: string, data: string }) => {
  return await axios.post(endpoint, {
    jsonrpc: "2.0",
    method: 'eth_call',
    params: [{
      to,
      data
    }, "latest"],
    id: 1,
  })
}

export const hexToUtf8 = (hexArray: number[]): string =>
  Buffer.from(hexArray.toString().replace('0x', ''), 'hex').toString('utf-8')

const main = async () => {
  console.log("Executing...")

  const abiStringName = "name()";
  const abiStringSymbol = "symbol()";
  const abiStringDecimals = "decimals()";

  const endpoint = "https://summer-convincing-sponge.matic.discover.quiknode.pro/f0b8d2ced97c06ed1f312a176a8123a9ef87a6f2/"
  // const to = "0x0000000000000000000000000000000000001010" // MATIC
  const to = "0x2791bca1f2de4661ed88a30c99a7a9449aa84174" // USDC

  console.log("> name()")
  const resName = await callEth_call({
    endpoint,
    to,
    data: generateDataFromWeb3(abiStringName)
  })
  console.log(resName.data.result)
  const name = Buffer.from(resName.data.result.slice(2), 'hex').toString("utf-8").trimStart()
  console.log(name)
  console.log(hexToUtf8(resName.data.result))

  console.log("> symbol()")
  const resSymbol = await callEth_call({
    endpoint,
    to,
    data: generateDataFromWeb3(abiStringSymbol)
  })
  console.log(resSymbol.data.result)
  const symbol = Buffer.from(resSymbol.data.result.slice(2), 'hex').toString("utf-8").trimStart()
  console.log(symbol)
  console.log(hexToUtf8(resSymbol.data.result))

  console.log("> decimals()")
  const resDecimals = await callEth_call({
    endpoint,
    to,
    data: generateDataFromWeb3(abiStringDecimals)
  })
  console.log(resDecimals.data.result)
  console.log(parseInt(resDecimals.data.result, 16))
}

main()
  .then(_ => console.log("Executed!!"))
  .catch(_ => console.log("Occured Error!!"))
