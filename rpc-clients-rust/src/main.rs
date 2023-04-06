use serde::Deserialize;

#[derive(Debug, Deserialize)]
struct JsonRpcResponse {
    jsonrpc: String,
    id: u64,
    result: String,
}


#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let url = "https://polygon-mainnet.g.alchemy.com/v2/sLp6VfuskMEwx8Wx0DvaRkI8qCoVYF8f";
    let json_request = r#"{
        "jsonrpc": "2.0",
        "method": "eth_blockNumber",
        "id": 1
    }"#;

    let client = reqwest::Client::new();
    let response = client.post(url)
        .body(json_request)
        .header("Content-Type", "application/json")
        .send()
        .await?
        .json::<JsonRpcResponse>()
        .await?;

    println!("{:?}", &response);
    println!("Block number: {}", u64::from_str_radix(&response.result[2..], 16)?);

    Ok(())
}
