import { invalidatePattern } from "../common/cache/cacheInvalidation";

export const invalidateAnalyticsCache = async () => {
  await Promise.all([
    invalidatePattern("analytics:*"),
  ]);
};
