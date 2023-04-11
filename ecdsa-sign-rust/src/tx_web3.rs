#[cfg(test)]
mod test {
    use std::str::FromStr;

    use secp256k1::SecretKey;
    use web3::{ethabi::ethereum_types::Address, types::{TransactionParameters, U256}};
        
    #[tokio::main]
    #[test]
    async fn test_tx() {
        let url = "http://127.0.0.1:3001";
        let transport = web3::transports::Http::new(url).unwrap();
        let web3 = web3::Web3::new(transport);

        let secret_key = SecretKey::from_slice(
            &hex::decode("0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef")
                .unwrap(),
        )
        .unwrap();

        let to = Address::from_str("0xc0ffee254729296a45a3885639AC7E10F9d54979").unwrap();
        let tx_object = TransactionParameters {
            to: Some(to),
            value: U256::exp10(17), //0.1 eth
            ..Default::default()
        };
        let signed = web3.accounts().sign_transaction(tx_object, &secret_key).await.unwrap();
        // Transport(Message("failed to send request: error sending request for url (http://127.0.0.1:3001/): error trying to connect: tcp connect error: Connection refused (os error 61)"))
        println!("Signed Tx: {:?}", signed);
    }
}