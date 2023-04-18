#[cfg(test)]
mod test {
    use secp256k1::{SecretKey, PublicKey, Secp256k1};
    use web3::{types::{TransactionRequest, H160}};

    #[test]
    fn test_tx() {
        let secp = Secp256k1::new();
        let secret_key = SecretKey::from_slice(
            &hex::decode("0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef")
                .unwrap(),
        )
        .unwrap();
        let public_key = PublicKey::from_secret_key(&secp, &secret_key);

        // payload data
        let nonce = 0;
        // let to = "0x0123456789abcdef0123456789abcdef0123456".parse().unwrap();
        // let value: i64 = 1000000000000000000;
        // let gas_price = 1000000000;
        // let gas_limit = 21000;
        // let data = "";

        // // トランザクションの設定
        // let tx = TransactionRequest {
        //     from: H160::zero(),
        //     to: Some(to),
        //     gas: Some(gas_limit.into()),
        //     gas_price: Some(gas_price.into()),
        //     value: Some(value.into()),
        //     nonce: Some(nonce.into()),
        //     data: Some(data.into()),
        //     ..TransactionRequest::default()
        // };
        // let tx_bytes = tx.rlp_bytes();
    }
}