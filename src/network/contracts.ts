import VaultABI from './abis/Vault.json';
import LBPFactoryABI from './abis/NoProtocolFeeLiquidityBootstrappingPoolFactory.json';
import LBPPoolABI from './abis/NoProtocolFeeLiquidityBootstrappingPool.json';
import { contractAddressListCollection } from './contractAddress';
import { ContractAddressList } from './types';
import { provider } from './provider';
import { Contract } from 'ethers';
import { CHAIN_ID } from '../constants';

const contractList: ContractAddressList = contractAddressListCollection[CHAIN_ID];

const getABI = function getABI(contractName: string) {
  switch (contractName) {
    case 'Vault':
      return VaultABI;
    case 'LBPFactory':
      return LBPFactoryABI;
    case 'LBPPool':
      return LBPPoolABI;
    default:
      throw new Error(`Unable to find ${contractName}ABI`);
  }
};

export const contracts = Object.keys(contractList).reduce((contractsObject, contractName) => {
  const address = contractList[contractName];
  const abi = getABI(contractName);
  contractsObject[contractName] = new Contract(address, abi, provider);
  return contractsObject;
}, {});
