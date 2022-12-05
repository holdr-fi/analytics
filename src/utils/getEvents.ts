import { Contract, EventFilter, Event } from 'ethers';

export const getEvents = async function getEvents(
  contract: Contract,
  eventFilter: EventFilter,
  startBlock: number,
  endBlock: 'latest' | number
): Promise<Event[]> {
  const endBlockAsNumber: number = endBlock == 'latest' ? await contract.provider.getBlockNumber() : endBlock;

  try {
    const events = await contract.queryFilter(eventFilter, startBlock, endBlockAsNumber);
    return events;
  } catch (e) {
    const errorString = e.toString();
    if (
      !errorString.includes('10K') &&
      !errorString.includes('1000 results') &&
      !errorString.includes('statement timeout') &&
      !errorString.includes('response size exceeded')
    ) {
      return [];
    }

    const midBlock = Math.floor((startBlock + endBlockAsNumber) / 2);

    const [left, right] = await Promise.all([
      getEvents(contract, eventFilter, startBlock, midBlock),
      getEvents(contract, eventFilter, midBlock + 1, endBlock),
    ]);

    return left.concat(right);
  }
};
