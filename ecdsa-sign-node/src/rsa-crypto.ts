const mainRsa = async () => {
  let crypto = await import('node:crypto');

  const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
  });
  console.log("> privateKey")
  console.log(privateKey.export({
    type: 'pkcs1',
    format: "pem"
  }))
  console.log("> publicKey")
  console.log(publicKey.export({
    type: 'pkcs1',
    format: "pem"
  }))

  const data = Buffer.from('Hello, world!');
  const hash = crypto.createHash('SHA256').update(data).digest();

  // sign
  const sign = crypto.createSign('SHA256');
  sign.update(hash);
  sign.end();
  const signature = sign.sign(privateKey, 'base64');
  console.log("> signature")
  console.log(signature)

  // verify
  const verify = crypto.createVerify('sha256').update(hash).verify(publicKey, signature, 'base64');
  console.log('Verification:', verify);
}

mainRsa()
  .then(_ => console.log("Finished!!"))
  .catch(_ => console.log("Error!!"))