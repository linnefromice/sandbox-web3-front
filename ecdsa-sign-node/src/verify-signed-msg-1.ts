import * as EthUtil from "ethereumjs-util"

const mainVerifySignedMsg01 = async () => {
  const SIGNER_ADDRESS_STRING = '0x89c24a88bad4abe0a4f5b2eb5a86db1fb323832c'
  const MSG = "piyopiyo!"
  const msgHex = Buffer.from(MSG, 'utf8').toString('hex')
  const msgHash = EthUtil.keccakFromHexString(`0x${msgHex}`)
  console.log(EthUtil.bufferToHex(msgHash))

  const SIGNED_MSG = {
    r : '0xdd7fa0d0b259468434cf14760c6607f36f2d7429feaaaedf6d86265c11098d20',
    s : '0x14cf83d2204e50b12fcb2445a70c214509d0f4edf0e0ee6e8d18fed8fbb146c0',
    v : 27
  }

  const publicKey = EthUtil.ecrecover(
    msgHash, 
    SIGNED_MSG.v, 
    EthUtil.toBuffer(SIGNED_MSG.r), 
    EthUtil.toBuffer(SIGNED_MSG.s)
  )
  const address = EthUtil.pubToAddress(publicKey)

  if (EthUtil.bufferToHex(address) == SIGNER_ADDRESS_STRING) console.log("Success recover address")
}

mainVerifySignedMsg01()
  .then(_ => console.log("Finished!!"))
  .catch(_ => console.log("Error!!"))
