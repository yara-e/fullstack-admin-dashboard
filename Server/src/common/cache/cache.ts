import { redis } from "../../config/redis";

export const getCache = async <T>(key: string): Promise<T | null> => {
  const data = await redis.get<T>(key);
  return data ?? null;
};

export const setCache = async (
  key: string,
  value: unknown,
  ttlSeconds = 300
) => {
  await redis.set(key, value, { ex: ttlSeconds });
};

export const deleteCache = async (key: string) => {
  await redis.del(key);
};
