// Required for Mocha unit tests, not for Serverless
import * as dotenv from 'dotenv';
dotenv.config();

if (typeof process.env.AURORA_URL === 'undefined') {
  throw new Error('Invalid AURORA_URL in .env');
}
if (typeof process.env.MUMBAI_URL === 'undefined') {
  throw new Error('Invalid MUMBAI_URL in .env');
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

export const AURORA_URL = process.env.AURORA_URL;
export const MUMBAI_URL = process.env.MUMBAI_URL;
export const CHAIN_ID = process.env.CHAIN_ID;
export const MUMBAISCAN_API_KEY = process.env.MUMBAISCAN_API_KEY;
export const AURORASCAN_API_KEY = process.env.AURORASCAN_API_KEY;

// Can only use ternary operator if we have two API keys to switch between.
export const BLOCK_EXPLORER_API_KEY = CHAIN_ID === '80001' ? MUMBAISCAN_API_KEY : AURORASCAN_API_KEY;
export const BLOCK_EXPLORER_BASE_URL =
  CHAIN_ID === '80001' ? 'https://api-testnet.polygonscan.com/api' : 'https://api-testnet.aurorascan.dev/api';
