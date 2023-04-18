import * as EthUtil from "ethereumjs-util"

const str_to_hash = (msg: String): Buffer => {
  const msgHexStr = Buffer.from(msg, 'utf8').toString('hex')
  return EthUtil.keccakFromHexString(`0x${msgHexStr}`) // use keccak256 hash
}

const sign = (privateKey: Buffer, msgHash: Buffer): EthUtil.ECDSASignature => {
  return EthUtil.ecsign(msgHash, privateKey)
}

const recover = (msgHash: Buffer, signature: EthUtil.ECDSASignature): Buffer => {
  const publicKey = EthUtil.ecrecover(
    msgHash, 
    signature.v, 
    EthUtil.toBuffer(signature.r), 
    EthUtil.toBuffer(signature.s)
  )
  return publicKey
}

const mainVerifySignedMsg01 = async () => {
  const PRIVATE_KEY_STRING = '0x61ce8b95ca5fd6f55cd97ac60817777bdf64f1670e903758ce53efc32c3dffeb'
  const SIGNER_ADDRESS_STRING = '0x89c24a88bad4abe0a4f5b2eb5a86db1fb323832c'
  const MSG = "piyopiyo!"

  const privateKey = EthUtil.toBuffer(PRIVATE_KEY_STRING)
  const msgHash = str_to_hash(MSG)
  
  const signature = sign(privateKey, msgHash)
  console.log("> signature")
  console.log(signature)
  const publicKey = recover(msgHash, signature)
  console.log("> publicKey")
  console.log(EthUtil.bufferToHex(publicKey))

  const address = EthUtil.pubToAddress(publicKey)

  if (EthUtil.bufferToHex(address) == SIGNER_ADDRESS_STRING) console.log("Success recover address")
}

const varifyIcpSample = async () => {
  const PUBLIC_KEY = "0x0297844aef6ac28dc2b988c6aed209d699c37ed7721003400e5ce0972424c7032f"
  const SIGNER_ADDRESS_STRING = '0x484b5cd0a9bb694926e4184f27a7e7f4100f0329'

  const r="0x4a6418f74adc8d8d32dc296df76d86dc22b8228ef5c16b7307d771c313ddb6e1";
  const s="0x435967954175120e602f60b312fdc5eb494057f12a30a72f9d1cad445b16077e";
  const v=37;
  // const transaction_hash="0xe7a8524a7f1d91ad76580e6fbd98845b35703c4656ddb34ddf4ee14bb89781b1";
  // const raw_transaction="0xf864808502540be400825208940000000000000000000000000000000000000000648025a04a6418f74adc8d8d32dc296df76d86dc22b8228ef5c16b7307d771c313ddb6e1a0435967954175120e602f60b312fdc5eb494057f12a30a72f9d1cad445b16077e";
  const message_hash="0x33fbf532a91adbdaebf8f8b1156cd520c7891381c51a3118017b3b9f3c219f08"

  const signature: EthUtil.ECDSASignature = {
    v,
    r: Buffer.from(r.slice(2), 'hex'),
    s: Buffer.from(s.slice(2), 'hex')
  }
  console.log(signature)
  const publicKey = recover(Buffer.from(message_hash.slice(2), 'hex'), signature)
  console.log("> publicKey")
  console.log(EthUtil.bufferToHex(publicKey))
  console.log(PUBLIC_KEY)
}

mainVerifySignedMsg01()
  .then(_ => console.log("Finished!!"))
  .catch(_ => console.log("Error!!"))

varifyIcpSample()
  .then(_ => console.log("Finished!!"))
  .catch(_ => console.log("Error!!"))