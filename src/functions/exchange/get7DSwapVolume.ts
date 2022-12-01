import { getAllSwaps } from '.';
import { getCurrentTimestamp } from '../../utils';
import { WEEK } from '../../constants';
import { getCoingeckoSpotPrice } from '../../utils';

const threshold = getCurrentTimestamp() - WEEK;

export const get7DSwapVolume = async function get7DSwapVolume(): Promise<number> {
  const { swaps } = await getAllSwaps();

  const swapVolumeByToken = swaps.reduce((runningSwapVolumes, swapInfo) => {
    if (swapInfo?.timestamp > threshold) {
      runningSwapVolumes[swapInfo?.tokenIn] = Object.prototype.hasOwnProperty.call(
        runningSwapVolumes,
        swapInfo?.tokenIn
      )
        ? runningSwapVolumes[swapInfo?.tokenIn] + parseFloat(swapInfo?.tokenAmountIn)
        : parseFloat(swapInfo?.tokenAmountIn);

      runningSwapVolumes[swapInfo?.tokenOut] = Object.prototype.hasOwnProperty.call(
        runningSwapVolumes,
        swapInfo?.tokenOut
      )
        ? runningSwapVolumes[swapInfo?.tokenOut] + parseFloat(swapInfo?.tokenAmountOut)
        : parseFloat(swapInfo?.tokenAmountOut);
    }
    return runningSwapVolumes;
  }, {});

  const prices = await getCoingeckoSpotPrice(Object.keys(swapVolumeByToken));

  const volume = Object.keys(swapVolumeByToken).reduce((sum, tokenAddress) => {
    return sum + prices[tokenAddress] * swapVolumeByToken[tokenAddress];
  }, 0);

  return volume;
};
