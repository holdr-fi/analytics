import { ContractAddressListCollection, ContractAddressList } from './types';

const mumbaiContractAddressList: ContractAddressList = {
  Vault: '0x7e5D79D67A1dAc16E8024B99c4B8A8Ec37C5eA2B',
  HLDR: '0x76e6Ab0F386A8Fcd727DcA6ce5C266D651458590',
  VotingEscrow: '0xC3Ba2291E0A3C87A83eC9A259BaBA3779738A47d',
};

const auroraContractAddressList: ContractAddressList = {
  Vault: '0x364d44dFc31b3d7b607797B514348d57Ad0D784E',
  HLDR: '0x1aaee8F00D02fcdb10cF1F0caB651dC83318c7AA',
  VotingEscrow: '',
};

export const contractAddressListCollection: ContractAddressListCollection = {
  [80001]: mumbaiContractAddressList,
  [1313161554]: auroraContractAddressList,
};
