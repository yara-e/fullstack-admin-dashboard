import { redis } from "../../config/redis";

export const invalidatePattern = async (pattern: string) => {
  const keys = await redis.keys(pattern);
if(!keys.length) return
  if (keys.length) {
    await redis.del(...keys);
  }
};
