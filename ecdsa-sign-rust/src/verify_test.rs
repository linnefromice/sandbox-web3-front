use secp256k1::{PublicKey, Secp256k1, ecdsa::Signature, Message};
use sha3::{Digest, Keccak256};

pub fn verify_tx_signature(tx_hash: &[u8], v: u64, r: &[u8], s: &[u8], public_key: &[u8]) -> bool {
    let message = &tx_hash[..];
    let mut keccak256 = Keccak256::new();
    keccak256.update(&message);
    let message_hash = Message::from_slice(keccak256.finalize().as_slice()).unwrap();

    let mut signature_bytes = [0u8; 65];
    signature_bytes[0..32].copy_from_slice(&r);
    signature_bytes[32..64].copy_from_slice(&s);
    signature_bytes[64] = v as u8;

    let secp = Secp256k1::new();
    let signature = Signature::from_compact(&signature_bytes).unwrap();
    let public_key = PublicKey::from_slice(&public_key).unwrap();

    secp.verify_ecdsa(&message_hash, &signature, &public_key).is_ok()
}

#[cfg(test)]
mod test {
    use hex_literal::hex;
    use super::verify_tx_signature;

    #[test]
    fn verify_1() {
        let pub_key = hex!("1de75dcceca3e9786802de5fa1d184e3a6bbfafd");
        let v = 37;
        let r = hex!("c2e16f7fc8a8cd02d16c263ebcfd8669b83f492a009b4ee8ed0186ef241e83d0");
        let s = hex!("3b37fcc7a22ea4f620f33aa0c332222193c05e8450d7a105dd6fd031d3d3de65");
        let transaction_hash = hex!("33ba2e2ee922e4d619f009244de90e9e1e92f0e74365f81a944ee633fca73c07");
        assert_eq!(verify_tx_signature(&transaction_hash, v, &r, &s, &pub_key), true);
    }
}