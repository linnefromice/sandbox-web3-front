use serde::Deserialize;

#[derive(Debug, Deserialize)]
struct JsonRpcResponse {
    jsonrpc: String,
    id: u64,
    result: String,
}

async fn call_eth_block_number(url: &str) -> Result<(), Box<dyn std::error::Error>> {
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

async fn call_eth_call(url: &str, to: &str, data: &str) -> Result<(), Box<dyn std::error::Error>> {
    let json_request = format!(r#"{{
        "jsonrpc": "2.0",
        "method": "eth_call",
        "id": 1,
        "params": [{{
            "to": "{}",
            "data": "{}"
        }}, "latest"]
    }}"#, to, data);

    let client = reqwest::Client::new();
    let response = client.post(url)
        .body(json_request)
        .header("Content-Type", "application/json")
        .send()
        .await?
        .json::<JsonRpcResponse>()
        .await?;

    println!("{:?}", &response);
    let bytes = hex::decode(&response.result[2..])?;
    let utf8_string = String::from_utf8(bytes)?;
    println!("{}", utf8_string); // "Hello World"が出力される

    Ok(())
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let url = "https://polygon-mainnet.g.alchemy.com/v2/sLp6VfuskMEwx8Wx0DvaRkI8qCoVYF8f";
    // call_eth_block_number(url).await
    let data_name = "0x06fdde03";
    let data_symbol = "0x95d89b41";
    call_eth_call(url, "0x2791bca1f2de4661ed88a30c99a7a9449aa84174", data_name).await?;
    call_eth_call(url, "0x2791bca1f2de4661ed88a30c99a7a9449aa84174", data_symbol).await
}
