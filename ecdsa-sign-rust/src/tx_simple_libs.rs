use rlp::{Encodable};

pub struct Transaction {
    nonce: u64,
    to: Option<Vec<u8>>,
    value: u64,
    gas: u64,
    gas_price: u64,
    data: Vec<u8>,
}

impl Encodable for Transaction {
    fn rlp_append(&self, s: &mut rlp::RlpStream) {
        s.append(&self.nonce);
        s.append(&self.gas_price);
        s.append(&self.gas);
        if let Some(to) = &self.to {
            s.append(to);
        } else {
            s.append(&"");
        }
        s.append(&self.value);
        s.append(&self.data);
    }
}

#[cfg(test)]
mod test {
    use ethereum_types::H256;
    use rlp::RlpStream;
    use sha3::Keccak256;
    use sha3::Digest;

    use super::Transaction;

    #[test]
    fn test_tx() {
        let transaction = Transaction {
            nonce: 0,
            to: Some(vec![]),
            value: 0,
            gas: 0,
            gas_price: 0,
            data: vec![],
        };
        
        let mut rlp_stream = RlpStream::new();
        rlp_stream.append(&transaction);
        let encoded = rlp_stream.out();
        let encoded_bytes = encoded.as_ref();
        println!("{:?}", encoded_bytes);

        let mut keccak = Keccak256::new();
        keccak.update(encoded_bytes);
        let tx_hash = H256::from_slice(&keccak.finalize());
    }
}