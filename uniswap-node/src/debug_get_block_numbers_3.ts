import EthereumDater from 'eth-date-to-block';
import {ethers} from 'ethers';
import {envs} from './environments';

const {providerUrl} = envs;

const mainGetBlockNumbers3 = async () => {
  const provider = new ethers.providers.JsonRpcProvider(providerUrl.optimism);
  const dater = new EthereumDater(provider, {
    accuracy: 15,
    maxRetries: 30,
  });

  const targetDates = [
    // '2023-05-01',
    // '2023-05-02',
    // '2023-05-03',
    // '2023-05-04',
    // '2023-05-05',
    // '2023-05-06',
    // '2023-05-07',
    // '2023-05-08',
    // '2023-05-09',
    // '2023-05-10',
    // '2023-05-11',
    // '2023-05-12',
    // '2023-05-13',
    '2023-05-14',
    '2023-05-15',
  ];
  const targetTimes: string[] = [
    '00:00:30',
    '01:00:30',
    '02:00:30',
    '03:00:30',
    '04:00:30',
    '05:00:30',
    '06:00:30',
    '07:00:30',
    '08:00:30',
    '09:00:30',
    '10:00:30',
    '11:00:30',
    '12:00:30',
    '13:00:30',
    '14:00:30',
    '15:00:30',
    '16:00:30',
    '17:00:30',
    '18:00:30',
    '19:00:30',
    '20:00:30',
    '21:00:30',
    '22:00:30',
    '23:00:30',
  ];
  const network = await provider.getNetwork();
  console.log(`network: name=${network.name}, chainId=${network.chainId}`);
  for await (const targetDate of targetDates) {
    if (targetTimes.length > 0) {
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
    } else {
      // fixed time: 00:00:00
      const target = `${targetDate}T00:00:00Z`;
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

mainGetBlockNumbers3()
  .then(_ => console.log('Success!!'))
  .catch(_ => console.error('Failure!!'));
