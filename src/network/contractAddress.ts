import { ContractAddressListCollection, ContractAddressList } from './types';

const mainnetContractAddressList: ContractAddressList = {
  Vault: '0xBA12222222228d8Ba445958a75a0704d566BF2C8',
  LBPFactory: '0x0F3e0c4218b7b0108a3643cFe9D3ec0d4F57c54e',
  LBPPool: '', // Substitute for LBP pool
  HLDR: '', // Substitute for LBP token
};

const mumbaiContractAddressList: ContractAddressList = {
  Vault: '0x7e5D79D67A1dAc16E8024B99c4B8A8Ec37C5eA2B',
  LBPFactory: '0x7695CEa20Aa5268dD319CA761AA686F7eE71B018',
  LBPPool: '0x835FF76688802eB8FC3e8156ad156FfD19c62C80',
  HLDR: '0x76e6Ab0F386A8Fcd727DcA6ce5C266D651458590',
};

const auroraContractAddressList: ContractAddressList = {
  Vault: '0x364d44dFc31b3d7b607797B514348d57Ad0D784E',
  LBPFactory: '0x1001e599ff9079717E176f224de7f1a27eACD3C2',
  LBPPool: '',
  HLDR: '0x1aaee8F00D02fcdb10cF1F0caB651dC83318c7AA',
};

export const contractAddressListCollection: ContractAddressListCollection = {
  [1]: mainnetContractAddressList,
  [80001]: mumbaiContractAddressList,
  [1313161554]: auroraContractAddressList,
};
