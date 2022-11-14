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

export const AURORA_URL = process.env.AURORA_URL;
export const MUMBAI_URL = process.env.MUMBAI_URL;
export const CHAIN_ID = process.env.CHAIN_ID;
