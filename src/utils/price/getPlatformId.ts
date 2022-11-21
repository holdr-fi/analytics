import { CHAIN_ID } from '../../constants';

export const getPlatformId = function getPlatformId(): string {
  switch (CHAIN_ID) {
    case '80001':
      // Mumbai testnet is not a valid platformId for Coingecko API
      return '';
    case '1':
      return 'ethereum';
    case '1313161554':
      return 'aurora';
    default:
      return '';
  }
};
