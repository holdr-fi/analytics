import { getAllSwapsWithinTime, SwapData } from './';
import { DAY } from '../../constants';
import { getCoingeckoSpotPrice } from '../../utils';

export const get24HSwapVolume = async function get24HSwapVolume(): Promise<number> {
  const swaps: SwapData[] = await getAllSwapsWithinTime(DAY);

  const swapVolumeByToken = swaps.reduce((runningSwapVolumes, swapInfo) => {
    runningSwapVolumes[swapInfo?.tokenIn] = Object.prototype.hasOwnProperty.call(runningSwapVolumes, swapInfo?.tokenIn)
      ? runningSwapVolumes[swapInfo?.tokenIn] + parseFloat(swapInfo?.tokenAmountIn)
      : parseFloat(swapInfo?.tokenAmountIn);

    runningSwapVolumes[swapInfo?.tokenOut] = Object.prototype.hasOwnProperty.call(
      runningSwapVolumes,
      swapInfo?.tokenOut
    )
      ? runningSwapVolumes[swapInfo?.tokenOut] + parseFloat(swapInfo?.tokenAmountOut)
      : parseFloat(swapInfo?.tokenAmountOut);
    return runningSwapVolumes;
  }, {});

  const prices = await getCoingeckoSpotPrice(Object.keys(swapVolumeByToken));

  const volume = Object.keys(swapVolumeByToken).reduce((sum, tokenAddress) => {
    return sum + prices[tokenAddress] * swapVolumeByToken[tokenAddress];
  }, 0);

  return volume;
};
