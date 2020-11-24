export const LIMITS = [20, 150, 500];

export const getNextLimit = ({ currentLimit, messageCount }) => {
  const nextLimitIdx = LIMITS.findIndex((l) => l === currentLimit) + 1;
  return LIMITS[nextLimitIdx] ? LIMITS[nextLimitIdx] : messageCount;
};

export const shouldShowThatsAllMessage = ({ currentLimit, messageCount }) =>
  messageCount !== 0 && messageCount <= currentLimit;
