export const getCurrentUnixTimestamp = function getCurrentUnixTimestamp(): number {
  return Math.floor(Date.now() / 1000);
};
