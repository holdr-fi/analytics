// Required for Mocha unit tests, not for Serverless
import * as dotenv from 'dotenv';
dotenv.config();

if (typeof process.env.MAINNET_URL === 'undefined') {
  throw new Error('Invalid MAINNET_URL in .env');
}
if (typeof process.env.AURORA_URL === 'undefined') {
  throw new Error('Invalid AURORA_URL in .env');
}
if (typeof process.env.MUMBAI_URL === 'undefined') {
  throw new Error('Invalid MUMBAI_URL in .env');
}
if (typeof process.env.CHAIN_ID === 'undefined') {
  throw new Error('Invalid CHAIN_ID in .env');
}
if (typeof process.env.ETHERSCAN_API_KEY === 'undefined') {
  throw new Error('Invalid ETHERSCAN_API_KEY in .env');
}
if (typeof process.env.MUMBAISCAN_API_KEY === 'undefined') {
  throw new Error('Invalid MUMBAISCAN_API_KEY in .env');
}
if (typeof process.env.AURORASCAN_API_KEY === 'undefined') {
  throw new Error('Invalid AURORASCAN_API_KEY in .env');
}

export const MAINNET_URL = process.env.MAINNET_URL;
export const AURORA_URL = process.env.AURORA_URL;
export const MUMBAI_URL = process.env.MUMBAI_URL;
export const CHAIN_ID = process.env.CHAIN_ID;

// Export correct block explorer API key

const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
const MUMBAISCAN_API_KEY = process.env.MUMBAISCAN_API_KEY;
const AURORASCAN_API_KEY = process.env.AURORASCAN_API_KEY;

let _BLOCK_EXPLORER_API_KEY: string;
let _BLOCK_EXPLORER_BASE_URL: string;
let _POOL_SUBGRAPH_URL: string;
let _GAUGE_SUBGRAPH_URL: string;

switch (CHAIN_ID) {
  case '1':
    _BLOCK_EXPLORER_API_KEY = ETHERSCAN_API_KEY;
    _BLOCK_EXPLORER_BASE_URL = 'https://api-testnet.polygonscan.com/api';
    _POOL_SUBGRAPH_URL = 'https://api.thegraph.com/subgraphs/name/balancer-labs/balancer';
    _GAUGE_SUBGRAPH_URL = 'https://api.thegraph.com/subgraphs/name/balancer-labs/balancer-gauges';
    break;
  case '80001':
    _BLOCK_EXPLORER_API_KEY = MUMBAISCAN_API_KEY;
    _BLOCK_EXPLORER_BASE_URL = 'https://api-testnet.polygonscan.com/api';
    _POOL_SUBGRAPH_URL = 'https://api.thegraph.com/subgraphs/name/kyzooghost/solace-swap-test';
    _GAUGE_SUBGRAPH_URL = 'https://api.thegraph.com/subgraphs/name/kyzooghost/solace-swap-gauges-test';
    break;
  case '1313161554':
    _BLOCK_EXPLORER_API_KEY = AURORASCAN_API_KEY;
    _BLOCK_EXPLORER_BASE_URL = 'https://api-testnet.aurorascan.dev/api';
    _POOL_SUBGRAPH_URL = 'https://api.thegraph.com/subgraphs/name/kyzooghost/balancer_aurora_fork';
    _GAUGE_SUBGRAPH_URL = '';
    break;
  default:
    throw new Error('Invalid CHAIN_ID');
}

export const BLOCK_EXPLORER_API_KEY = _BLOCK_EXPLORER_API_KEY;
export const BLOCK_EXPLORER_BASE_URL = _BLOCK_EXPLORER_BASE_URL;
export const POOL_SUBGRAPH = _POOL_SUBGRAPH_URL;
export const GAUGE_SUBGRAPH = _GAUGE_SUBGRAPH_URL;
