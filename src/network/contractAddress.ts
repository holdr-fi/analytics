import { ContractAddressListCollection, ContractAddressList } from './types';

const mainnetContractAddressList: ContractAddressList = {
  Vault: '0xBA12222222228d8Ba445958a75a0704d566BF2C8',
  HLDR: '0xba100000625a3754423978a60c9317c58a424e3D',
  VotingEscrow: '0xC128a9954e6c874eA3d62ce62B468bA073093F25',
};

const mumbaiContractAddressList: ContractAddressList = {
  Vault: '0x7e5D79D67A1dAc16E8024B99c4B8A8Ec37C5eA2B',
  HLDR: '0x76e6Ab0F386A8Fcd727DcA6ce5C266D651458590',
  VotingEscrow: '0xC3Ba2291E0A3C87A83eC9A259BaBA3779738A47d',
};

const auroraContractAddressList: ContractAddressList = {
  Vault: '0x364d44dFc31b3d7b607797B514348d57Ad0D784E',
  HLDR: '0x1aaee8F00D02fcdb10cF1F0caB651dC83318c7AA',
  VotingEscrow: '0x5ed1e3D53AfdB0d0bc8661e056dffCD51c95bb9D',
};

export const contractAddressListCollection: ContractAddressListCollection = {
  [1]: mainnetContractAddressList,
  [80001]: mumbaiContractAddressList,
  [1313161554]: auroraContractAddressList,
};
