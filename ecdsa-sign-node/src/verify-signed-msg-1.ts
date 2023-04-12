import * as EthUtil from "ethereumjs-util"

const str_to_hash = (msg: String): Buffer => {
  const msgHexStr = Buffer.from(msg, 'utf8').toString('hex')
  return EthUtil.keccakFromHexString(`0x${msgHexStr}`) // use keccak256 hash
}

const sign = (privateKey: Buffer, msg: String): EthUtil.ECDSASignature => {
  const msgHash = str_to_hash(msg)
  return EthUtil.ecsign(msgHash, privateKey)
}

const recover = (msg: String, signature: EthUtil.ECDSASignature): Buffer => {
  const msgHash = str_to_hash(msg)
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
  
  const signature = sign(privateKey, MSG)
  console.log("> signature")
  console.log(signature)
  const publicKey = recover(MSG, signature)
  console.log("> publicKey")
  console.log(EthUtil.bufferToHex(publicKey))

  const address = EthUtil.pubToAddress(publicKey)

  if (EthUtil.bufferToHex(address) == SIGNER_ADDRESS_STRING) console.log("Success recover address")
}

mainVerifySignedMsg01()
  .then(_ => console.log("Finished!!"))
  .catch(_ => console.log("Error!!"))
