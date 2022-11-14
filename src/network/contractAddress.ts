import { ContractAddressListCollection, ContractAddressList } from './types';

const mumbaiContractAddressList: ContractAddressList = {
  Vault: '0x7e5D79D67A1dAc16E8024B99c4B8A8Ec37C5eA2B',
  LBPFactory: '0x7695CEa20Aa5268dD319CA761AA686F7eE71B018',
  LBPPool: '0x835FF76688802eB8FC3e8156ad156FfD19c62C80',
};

export const contractAddressListCollection: ContractAddressListCollection = {
  [80001]: mumbaiContractAddressList,
};
