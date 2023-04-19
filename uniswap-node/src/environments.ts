import * as dotenv from 'dotenv';

dotenv.config();

const _env = process.env;
export const envs = {
  providerUrl: {
    ethereum: _env.ETHEREUM_PROVIDER_URL || '',
    polygon: _env.POLYGON_PROVIDER_URL || '',
    optimism: _env.OPTIMISM_PROVIDER_URL || '',
    arbitrum: _env.ARBITRUM_PROVIDER_URL || '',
    bnb: _env.BNB_PROVIDER_URL || '',
  },
};
