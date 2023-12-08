import EthereumDater from 'eth-date-to-block';
import {ethers} from 'ethers';
import {envs} from '../src/environments';

const {providerUrl} = envs;

const mainGetBlockNumbers = async () => {
  const provider = new ethers.providers.JsonRpcProvider(providerUrl.ethereum_2);
  const dater = new EthereumDater(provider, {
    accuracy: 15,
    maxRetries: 30,
  });

  const targetDates = [
    // '2023-03-01',
    // '2023-03-02',
    // '2023-03-03',
    // '2023-03-04',
    // '2023-03-05',
    // '2023-03-06',
    // '2023-03-07',
    // '2023-03-08',
    // '2023-03-09',
    // '2023-03-10',
    // '2023-03-11',
    // '2023-03-12',
    // '2023-03-13',
    // '2023-03-14',
    // '2023-03-15',
    // '2023-03-16',
    // '2023-03-17',
    // '2023-03-18',
    // '2023-03-19',
    // '2023-03-20',
    // '2023-03-21',
    // '2023-03-22',
    // '2023-03-23',
    // '2023-03-24',
    // '2023-03-25',
    // '2023-03-26',
    // '2023-03-27',
    // '2023-03-28',
    // '2023-03-29',
    // '2023-03-30',
    // '2023-03-31',
    // '2023-04-01',
    // '2023-04-02',
    // '2023-04-03',
    // '2023-04-04',
    // '2023-04-05',
    // '2023-04-06',
    // '2023-04-07',
    // '2023-04-08',
    // '2023-04-09',
    // '2023-04-10',
    // '2023-04-11',
    // '2023-04-12',
    // '2023-04-13',
    // '2023-04-14',
    // '2023-04-15',
    // '2023-04-16',
    // '2023-04-17',
    // '2023-04-18',
    // '2023-04-19',
    // '2023-04-20',
    // '2023-04-21',
    // '2023-04-22',
    // '2023-04-23',
    // '2023-04-24',
    // '2023-04-25',
    // '2023-04-26',
    // '2023-04-27',
    // '2023-04-28',
    // '2023-04-29',
    // '2023-04-30',
    // '2023-05-01',
    // '2023-05-02',
    // '2023-05-03',
    // '2023-05-04',
    // '2023-05-05',
    // '2023-05-06',
    // '2023-05-07',
    '2023-05-08',
    // '2023-05-09',
    // '2023-05-10',
  ];
  const targetTimes = [
    '23:59:30',
    // '00:00:30',
    // '01:00:30',
    // '02:00:30',
    // '03:00:30',
    // '04:00:30',
    // '05:00:30',
    // '06:00:30',
    // '07:00:30',
    // '08:00:30',
    // '09:00:30',
    // '10:00:30',
    // '11:00:30',
    // '12:00:30',
    // '13:00:30',
    // '14:00:30',
    // '15:00:30',
    // '16:00:30',
    // '17:00:30',
    // '18:00:30',
    // '19:00:30',
    // '20:00:30',
    // '21:00:30',
    // '22:00:30',
    // '23:00:30',
  ];
  const network = await provider.getNetwork();
  console.log(`network: name=${network.name}, chainId=${network.chainId}`);
  for await (const targetDate of targetDates) {
    for await (const targetTime of targetTimes) {
      const target = `${targetDate}T${targetTime}Z`;
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
  }
};

mainGetBlockNumbers()
  .then(_ => console.log('Success!!'))
  .catch(_ => console.error('Failure!!'));
