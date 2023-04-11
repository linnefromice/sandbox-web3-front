#[cfg(test)]
mod test {
    use std::str::FromStr;
    use secp256k1::SecretKey;
    use web3_forked::signing::{SecretKeyRef};
    use web3_forked::types::{Address};
    use web3_forked::api::accounts_signing::Transaction;

    #[test]
    fn test_tx() {
        let secret_key = SecretKey::from_slice(
            &hex::decode("0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef")
                .unwrap(),
        )
        .unwrap();
        let to = Address::from_str("0xc0ffee254729296a45a3885639AC7E10F9d54979").unwrap();
        let tx_object = Transaction {
            nonce: 0.into(),
            gas: 2_000_000.into(),
            gas_price: 234_567_897_654_321u64.into(),
            to: Some(to),
            value: 1_000_000_000.into(),
            data: Vec::new(),
            transaction_type: None,
            access_list: vec![],
            max_priority_fee_per_gas: 0.into(),
        };
        let signed_tx = tx_object.sign(SecretKeyRef::new(&secret_key), 1);
        println!("{:?}", signed_tx)
    }
}