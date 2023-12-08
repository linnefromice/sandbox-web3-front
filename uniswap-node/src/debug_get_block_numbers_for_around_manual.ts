import EthereumDater from 'eth-date-to-block';
import {ethers} from 'ethers';
import {envs} from './environments';

const {providerUrl} = envs;

const mainGetBlockNumbers = async () => {
  const provider = new ethers.providers.JsonRpcProvider(providerUrl.ethereum);
  const dater = new EthereumDater(provider, {
    accuracy: 15,
    maxRetries: 30,
  });

  const targets = [
    '2023-05-08T23:59:58Z',
    '2023-05-08T23:59:59Z',
    '2023-05-09T00:00:00Z',
    '2023-05-09T00:00:01Z',
    '2023-05-09T00:00:02Z',
    '2023-05-09T00:00:03Z',
    '2023-05-09T00:00:04Z',
    '2023-05-09T00:00:05Z',
    '2023-05-09T00:00:06Z',
    '2023-05-09T00:00:07Z',
    '2023-05-09T00:00:08Z',
  ];
  const network = await provider.getNetwork();
  console.log(`network: name=${network.name}, chainId=${network.chainId}`);
  for await (const target of targets) {
    await dater
      .getBlock(target)
      .then(res => {
        const block = res.block;
        console.log(
          `${target},${block.number},${
            block.timestamp
          },${block.date.toISOString()},`
        );
      })
      .catch(e => console.log(`${target},,,,${e.message}`));
  }
};

mainGetBlockNumbers()
  .then(_ => console.log('Success!!'))
  .catch(_ => console.error('Failure!!'));
