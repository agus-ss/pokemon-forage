// cacheUtil.ts
import { LRUCache } from 'lru-cache';

// Create an instance of LRUCache
const cache = new LRUCache<string, any>({
  max: 500, // Maximum number of items in the cache
  ttl: 1000 * 60 * 60, // Time to live for cache items in milliseconds (1 hour)
});

export const getCachedData = async (key: string, fetchFunc: () => Promise<any>) => {
  if (cache.has(key)) {
    return cache.get(key);
  }

  const data = await fetchFunc();
  cache.set(key, data);
  return data;
};

export const hasCachedData = (key: string): boolean => {
  return cache.has(key);
};
