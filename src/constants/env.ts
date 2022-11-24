// Required for Mocha unit tests, not for Serverless
import * as dotenv from 'dotenv';
dotenv.config();

if (typeof process.env.AURORA_URL === 'undefined') {
  throw new Error('Invalid AURORA_URL in .env');
}
if (typeof process.env.MUMBAI_URL === 'undefined') {
  throw new Error('Invalid MUMBAI_URL in .env');
}
if (typeof process.env.MAINNET_URL === 'undefined') {
  throw new Error('Invalid MAINNET_URL in .env');
}
if (typeof process.env.CHAIN_ID === 'undefined') {
  throw new Error('Invalid CHAIN_ID in .env');
}
if (typeof process.env.MUMBAISCAN_API_KEY === 'undefined') {
  throw new Error('Invalid MUMBAISCAN_API_KEY in .env');
}
if (typeof process.env.AURORASCAN_API_KEY === 'undefined') {
  throw new Error('Invalid AURORASCAN_API_KEY in .env');
}
if (typeof process.env.ETHERSCAN_API_KEY === 'undefined') {
  throw new Error('Invalid ETHERSCAN_API_KEY in .env');
}

export const AURORA_URL = process.env.AURORA_URL;
export const MUMBAI_URL = process.env.MUMBAI_URL;
export const MAINNET_URL = process.env.MAINNET_URL;
export const CHAIN_ID = process.env.CHAIN_ID;
const MUMBAISCAN_API_KEY = process.env.MUMBAISCAN_API_KEY;
const AURORASCAN_API_KEY = process.env.AURORASCAN_API_KEY;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;

// Can only use ternary operator if we have two API keys to switch between.

let _BLOCK_EXPLORER_API_KEY: string;
let _BLOCK_EXPLORER_BASE_URL: string;

switch (CHAIN_ID) {
  case '1':
    _BLOCK_EXPLORER_API_KEY = ETHERSCAN_API_KEY;
    _BLOCK_EXPLORER_BASE_URL = 'https://api.etherscan.io/api';
    break;
  case '80001':
    _BLOCK_EXPLORER_API_KEY = MUMBAISCAN_API_KEY;
    _BLOCK_EXPLORER_BASE_URL = 'https://api-testnet.polygonscan.com/api';
    break;
  case '1313161554':
    _BLOCK_EXPLORER_API_KEY = AURORASCAN_API_KEY;
    _BLOCK_EXPLORER_BASE_URL = 'https://api-testnet.aurorascan.dev/api';
    break;
  default:
    throw new Error('Invalid CHAIN_ID');
}

export const BLOCK_EXPLORER_API_KEY = _BLOCK_EXPLORER_API_KEY;
export const BLOCK_EXPLORER_BASE_URL = _BLOCK_EXPLORER_BASE_URL;
