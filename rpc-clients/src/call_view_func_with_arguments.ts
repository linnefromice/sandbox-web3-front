const axios = require('axios')
const Web3 = require('web3');

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

//// for usdc
// Stargate Finanace: USD Coin (PoS)-LP (S*USDC)
// -> 14,589,642.05966 (2.5573%)
const addr_sUSDC = "0x1205f31718499dbf1fca446663b532ef87481fe1"
// Aave: Aave Polygon USDC (aPolUSDC)
// -> 9,120,189.756992 (1.5552%)
const addr_aUSDC = "0x625e7708f30ca75bfd92586e17077590c60eb4cd"
// Balancer V2
// -> 6,167,158.728773 (1.0516%)
const addr_balanceV2 = "0xba12222222228d8ba445958a75a0704d566bf2c8"

const main = async () => {
  const endpoint = "https://summer-convincing-sponge.matic.discover.quiknode.pro/f0b8d2ced97c06ed1f312a176a8123a9ef87a6f2/"
  const abiStringBalanceOf = "balanceOf(address)";

  const signature = generateDataFromWeb3(abiStringBalanceOf)
  
  // const to = "0x0000000000000000000000000000000000001010" // MATIC
  const to = "0x2791bca1f2de4661ed88a30c99a7a9449aa84174" // USDC
  const accountAddress = addr_sUSDC
  const encodedAddress = accountAddress.replace(/^0x/, '').padStart(64, '0');
  const data = `${signature}${encodedAddress}`;

  const resBalanceOf = await callEth_call({
    endpoint,
    to,
    data,
  })
  console.log(BigInt(resBalanceOf.data.result))
}

main()
  .then(_ => console.log("Executed!!"))
  .catch(_ => console.log("Occured Error!!"))
