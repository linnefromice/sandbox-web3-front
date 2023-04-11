#[cfg(test)]
mod test {
    use bitcoin_hashes::{sha256, Hash};
    use secp256k1::{SecretKey, PublicKey, Secp256k1, Message};
        
    #[test]
    fn simple_sign_verify() {
        let secp = Secp256k1::new();
        let secret_key = SecretKey::from_slice(
            &hex::decode("0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef")
                .unwrap(),
        )
        .unwrap();
        let public_key = PublicKey::from_secret_key(&secp, &secret_key);

        let message = b"Hello, world!";
        let message_hash = Message::from_slice(sha256::Hash::hash(message).as_ref()).unwrap();
        let signature = secp.sign_ecdsa(&message_hash, &secret_key);

        assert!(secp.verify_ecdsa(&message_hash, &signature, &public_key).is_ok());
    }
}