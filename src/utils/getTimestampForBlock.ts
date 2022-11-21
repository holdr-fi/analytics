import { getCurrentTimestamp } from './';
import { BLOCK_EXPLORER_API_KEY, BLOCK_EXPLORER_BASE_URL } from '../constants';
import axios from 'axios';

// Use Etherscan API endpoint - https://docs.etherscan.io/api-endpoints/blocks#get-block-number-by-timestamp
// Initially attempted modified binary search implementation however O(lg N) is too slow when each network call can take up to 2s to return.

export const getBlockForTimestamp = async function getBlockForTimestamp(desiredTimestamp: number): Promise<number> {
  if (desiredTimestamp > getCurrentTimestamp()) {
    throw new Error('Cannot get block for timestamp in the future');
  }

  /*
  Expecting:
    data: {
      "status":"1",
      "message":"OK",
      "result":"12712551"
    }
   */
  const {
    data: { result },
  } = await axios.get(BLOCK_EXPLORER_BASE_URL, {
    params: {
      module: 'block',
      action: 'getblocknobytime',
      timestamp: desiredTimestamp,
      closest: 'before',
      apikey: BLOCK_EXPLORER_API_KEY,
    },
  });

  return parseInt(result, 10);
};
