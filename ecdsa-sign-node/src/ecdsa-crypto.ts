const mainEcdsa = async () => {
  const crypto = await import('node:crypto');

  const { privateKey, publicKey } = crypto.generateKeyPairSync("ec", {
    namedCurve: 'secp256k1'
  })
  console.log("> privateKey")
  console.log(privateKey.export({
    type: 'pkcs8',
    format: "pem"
  }))
  console.log("> publicKey")
  console.log(publicKey.export({
    type: 'spki',
    format: "pem"
  }))

  const data = Buffer.from('Hello, world!');
  const hash = crypto.createHash('SHA256').update(data).digest();

  // sign
  const signature = crypto.createSign('SHA256').update(hash).sign(privateKey, 'base64');
  console.log("> signature")
  console.log(signature)

  // verify
  const verify = crypto.createVerify('sha256').update(hash).verify(publicKey, signature, 'base64');
  console.log('Verification:', verify);
}

mainEcdsa()
  .then(_ => console.log("Finished!!"))
  .catch(_ => console.log("Error!!"))