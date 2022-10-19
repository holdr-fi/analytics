import {
  parseBribeDeposits,
  createMerkleTree,
  getGaugeToProposalMap,
  createEmptyS3Objects,
  getUpdateRewardsMetadataParameters,
  getClaimParameters,
} from './functions';
import { s3keys } from './constants';

export const parseBribeDepositsHandler = async function parseBribeDepositsHandler(event) {
  try {
    console.time('parseBribeDeposits');
    await parseBribeDeposits();
    console.timeEnd('parseBribeDeposits');
    return {
      statusCode: 200,
      body: 'parseBribeDeposits success, saved to ParseBribeDepositResults object in S3',
    };
  } catch (e) {
    console.error(e);
    return { statusCode: 400, body: 'parseBribeDepositsHandler error' };
  }
};

export const createMerkleTreeHandler = async function createMerkleTreeHandler(event) {
  try {
    console.time('createMerkleTree');
    await createMerkleTree();
    console.timeEnd('createMerkleTree');
    return {
      statusCode: 200,
      body: 'createMerkleTreeHandler success',
    };
  } catch (e) {
    console.error(e);
    return { statusCode: 400, body: 'createMerkleTreeHandler error' };
  }
};

export const getGaugeToProposalMapHandler = async function getGaugeToProposalMapHandler(event) {
  try {
    console.time('getGaugeToProposal');
    await getGaugeToProposalMap();
    console.timeEnd('getGaugeToProposal');
    return {
      statusCode: 200,
      body: 'getGaugeToProposalHandler success',
    };
  } catch (e) {
    console.error(e);
    return { statusCode: 400, body: 'getGaugeToProposalHandler error' };
  }
};

export const createEmptyS3ObjectsHandler = async function createEmptyS3ObjectsHandler(event) {
  try {
    console.time('createEmptyS3Objects');
    await createEmptyS3Objects(s3keys);
    console.timeEnd('createEmptyS3Objects');
    return {
      statusCode: 200,
      message: 'createEmptyS3ObjectsHandler success',
    };
  } catch (e) {
    console.error(e);
    return { statusCode: 400, body: 'createEmptyS3ObjectsHandler error' };
  }
};

export const getUpdateRewardsMetadataParametersHandler = async function getUpdateRewardsMetadataParametersHandler(
  event
) {
  try {
    console.time('getUpdateRewardsMetadataParameters');
    const updateRewardsMetadataParameters = await getUpdateRewardsMetadataParameters();
    console.timeEnd('getUpdateRewardsMetadataParameters');
    return {
      statusCode: 200,
      body: JSON.stringify(updateRewardsMetadataParameters),
    };
  } catch (e) {
    console.error(e);
    return { statusCode: 400, body: 'getUpdateRewardsMetadataParametersHandler error' };
  }
};

export const getClaimParametersHandler = async function getClaimParametersHandler(event) {
  // How to add event with address here?
  const address: string = event?.queryStringParameters?.address || '';
  console.log(event);
  console.log(`address: ${address}`);
  try {
    console.time('getClaimParameters');
    const claimParameters = await getClaimParameters(address);
    console.timeEnd('getClaimParameters');
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(claimParameters),
    };
  } catch (e) {
    console.error(e);
    return { statusCode: 400, body: 'getClaimParametersHandler error' };
  }
};
