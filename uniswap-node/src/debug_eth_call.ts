import {UniswapV3Pool__factory} from './types/typechain';

const debug_ethCall = async () => {
  const iface = UniswapV3Pool__factory.createInterface();
  console.log(iface.encodeFunctionData('slot0'));
  console.log(iface.encodeFunctionData('observations', [[0]]));
  console.log(iface.encodeFunctionData('observations', [[1]]));
};

// debug_ethCall()
//   .then(_ => console.log('Success!!'))
//   .catch(_ => console.error('Failure!!'));
