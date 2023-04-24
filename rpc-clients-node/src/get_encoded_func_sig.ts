import { ethers } from "ethers";
import { FormatTypes } from "ethers/lib/utils";

const Web3 = require('web3');

const getEncodedFuncSig = (signature: string): string => {
  const web3 = new Web3("")
  return web3.eth.abi.encodeFunctionSignature(signature) as string
}
const TARGET_FUNCS: string[] = [
  "return_multi_transfer(bool,uint256)",
  "return_uint256(bool)",
  "return_uint64(bool)",
  "return_uint8(bool)",
  "transfers(uint256)"
]
const mainEx = async () => {
  for (const target of TARGET_FUNCS) {
    console.log(getEncodedFuncSig(target))
  }
}

const HUMAN_READABLE_ABI: string[] = [
  "function return_address() public pure returns (address)",
  "function return_uint8(bool isMax) public pure returns (uint8)",
  "function return_uint64(bool isMax) public pure returns (uint64)",
  "function return_uint256(bool isMax) public pure returns (uint256)",
  "function return_string() public pure returns (string memory)",
  // "function return_transfer_max_value() public pure returns (Transfer memory)",
  // "function return_transfer_zero_value() public pure returns (Transfer memory)",
  // "function return_multi_transfer(bool isMax, uint count) public pure returns (Transfer[] memory)",
  "function addTransfer(address from, address to, uint value) public",
  "function getTransferCount() public view returns (uint)",
  // "function getTransfers(uint from, uint count) public view returns (Transfer[] memory)",
  "function removeAllTransfers() public"
]
const JSON_ABI = `[
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "addTransfer",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "from",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
          }
        ],
        "internalType": "struct SampleV1.Transfer[]",
        "name": "inputs",
        "type": "tuple[]"
      }
    ],
    "name": "addTransfers",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getTransferCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "from",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "count",
        "type": "uint256"
      }
    ],
    "name": "getTransfers",
    "outputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "from",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
          }
        ],
        "internalType": "struct SampleV1.Transfer[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "removeAllTransfers",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "return_address",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bool",
        "name": "isMax",
        "type": "bool"
      },
      {
        "internalType": "uint256",
        "name": "count",
        "type": "uint256"
      }
    ],
    "name": "return_multi_transfer",
    "outputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "from",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
          }
        ],
        "internalType": "struct SampleV1.Transfer[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "return_string",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "return_transfer_max_value",
    "outputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "from",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
          }
        ],
        "internalType": "struct SampleV1.Transfer",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "return_transfer_zero_value",
    "outputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "from",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
          }
        ],
        "internalType": "struct SampleV1.Transfer",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bool",
        "name": "isMax",
        "type": "bool"
      }
    ],
    "name": "return_uint256",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bool",
        "name": "isMax",
        "type": "bool"
      }
    ],
    "name": "return_uint64",
    "outputs": [
      {
        "internalType": "uint64",
        "name": "",
        "type": "uint64"
      }
    ],
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bool",
        "name": "isMax",
        "type": "bool"
      }
    ],
    "name": "return_uint8",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "transfers",
    "outputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]`
const mainEx2 = async () => {
  // by Human Readable ABI
  // const iface = new ethers.utils.Interface(HUMAN_READABLE_ABI)
  
  // by JSON ABI
  const iface = new ethers.utils.Interface(JSON_ABI);
  // console.log(iface.format(FormatTypes.full));
  console.log(iface.encodeFunctionData("return_multi_transfer", [true, 3]))
  console.log(iface.encodeFunctionData("return_uint8", [true]))
  console.log(iface.encodeFunctionData("return_uint64", [true]))
  console.log(iface.encodeFunctionData("return_uint256", [true]))
}

const mainSignedTx1 = async () => {
  const privateKey = "" // TODO
  const contractAddr = "0x8B471ADcb23E4458F6d974dF3a7D7fD616E4F002"

  const provider = new ethers.providers.JsonRpcProvider("https://polygon-mumbai.g.alchemy.com/v2/<YOUR_KEY>")
  const chainId = 80001
  const wallet = new ethers.Wallet(privateKey, provider)

  const iface = new ethers.utils.Interface(JSON_ABI)
  const fromAddress = ethers.constants.AddressZero
  const toAddress = "" // TODO
  const value = ethers.utils.parseEther("0.01")
  const data = iface.encodeFunctionData('addTransfer', [fromAddress, toAddress, value]);

  const gasPrice = await wallet.provider.getGasPrice();
  const nonce = await wallet.getTransactionCount();

  const tx = {
    to: contractAddr,
    gasLimit: 500000,
    gasPrice: gasPrice,
    nonce: nonce,
    data: data,
    chainId: chainId
  };

  const signedTx = await wallet.signTransaction(tx);
  console.log(signedTx)
}

const mainSignedTx2 = async () => {
  const privateKey = "" // TODO
  const contractAddr = "0x8B471ADcb23E4458F6d974dF3a7D7fD616E4F002"

  const provider = new ethers.providers.JsonRpcProvider("https://polygon-mumbai.g.alchemy.com/v2/<YOUR_KEY>")
  const chainId = 80001
  const wallet = new ethers.Wallet(privateKey, provider)

  const iface = new ethers.utils.Interface(JSON_ABI)
  const fromAddress = ethers.constants.AddressZero
  const toAddress = "" // TODO
  const transfers = [
    {
      from: fromAddress,
      to: toAddress,
      value: ethers.utils.parseEther("0.1")
    },
    {
      from: fromAddress,
      to: toAddress,
      value: ethers.utils.parseEther("0.2")
    },
    {
      from: fromAddress,
      to: toAddress,
      value: ethers.utils.parseEther("0.3")
    }
  ]
  const data = iface.encodeFunctionData('addTransfers', [transfers]);

  const gasPrice = await wallet.provider.getGasPrice();
  const nonce = await wallet.getTransactionCount();

  const tx = {
    to: contractAddr,
    gasLimit: 500000,
    gasPrice: gasPrice,
    nonce: nonce,
    data: data,
    chainId: chainId
  };

  const signedTx = await wallet.signTransaction(tx);
  console.log(signedTx)
}

mainSignedTx2()
  .then(() => console.log("Success!!"))
  .catch(() => console.log("Failure..."))