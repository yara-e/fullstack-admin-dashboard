import { getCache, setCache } from "./cache";

type CachedServiceOptions<T> = {
  key: string;
  ttl?: number;
  fetcher: () => Promise<T>;
};

export const cachedService = async <T>({
  key,
  ttl = 300,
  fetcher,
}: CachedServiceOptions<T>): Promise<T> => {

  const cached = await getCache<T>(key);

  if (cached) {
    console.log("Cache HIT:", key);
    return cached;
  }

  console.log("Cache MISS:", key);

  const freshData = await fetcher();

  await setCache(key, freshData, ttl);

  return freshData;
};
