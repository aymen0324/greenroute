import { createClient, RedisClientType } from 'redis';
import { logger } from './logger';

let redisClient: RedisClientType | null = null;

export const connectRedis = async (): Promise<RedisClientType | null> => {
  // Check if Redis is enabled
  if (process.env.REDIS_ENABLED === 'false') {
    logger.info('Redis disabled via environment variable');
    return null;
  }

  if (!redisClient) {
    const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
    
    redisClient = createClient({
      url: redisUrl,
      socket: {
        reconnectStrategy: (retries) => Math.min(retries * 50, 1000)
      }
    });

    redisClient.on('error', (err) => {
      logger.error('Redis Client Error:', err);
    });

    redisClient.on('connect', () => {
      logger.info('✅ Redis connected successfully');
    });

    redisClient.on('ready', () => {
      logger.info('🔥 Redis ready for commands');
    });

    redisClient.on('reconnecting', () => {
      logger.warn('🔄 Redis reconnecting...');
    });

    try {
      await redisClient.connect();
    } catch (error) {
      logger.error('❌ Redis connection failed:', error);
      logger.warn('Continuing without Redis cache');
      return null;
    }
  }

  return redisClient;
};

export const disconnectRedis = async (): Promise<void> => {
  if (redisClient && redisClient.isOpen) {
    await redisClient.disconnect();
    logger.info('🔌 Redis disconnected');
  }
};

export const getRedisClient = (): RedisClientType | null => {
  if (!redisClient || !redisClient.isOpen) {
    return null; // Redis not available
  }
  return redisClient;
};

// Helper functions for common Redis operations
export const setCache = async (key: string, value: any, expireInSeconds?: number): Promise<void> => {
  try {
    const client = getRedisClient();
    if (!client) return; // Redis disabled
    
    const serializedValue = JSON.stringify(value);
    
    if (expireInSeconds) {
      await client.setEx(key, expireInSeconds, serializedValue);
    } else {
      await client.set(key, serializedValue);
    }
  } catch (error) {
    logger.error(`Error setting cache for key ${key}:`, error);
    // Don't throw error, just log it
  }
};

export const getCache = async (key: string): Promise<any> => {
  try {
    const client = getRedisClient();
    if (!client) return null; // Redis disabled
    
    const value = await client.get(key);
    
    if (value) {
      return JSON.parse(value);
    }
    return null;
  } catch (error) {
    logger.error(`Error getting cache for key ${key}:`, error);
    return null;
  }
};

export const deleteCache = async (key: string): Promise<void> => {
  try {
    const client = getRedisClient();
    if (!client) return; // Redis disabled
    
    await client.del(key);
  } catch (error) {
    logger.error(`Error deleting cache for key ${key}:`, error);
    // Don't throw error, just log it
  }
};

export const deleteCachePattern = async (pattern: string): Promise<void> => {
  try {
    const client = getRedisClient();
    if (!client) return; // Redis disabled
    
    const keys = await client.keys(pattern);
    
    if (keys.length > 0) {
      await client.del(keys);
    }
  } catch (error) {
    logger.error(`Error deleting cache pattern ${pattern}:`, error);
    // Don't throw error, just log it
  }
};

// Initialize redisClient for default export
const initializeRedis = async (): Promise<RedisClientType | null> => {
  return await connectRedis();
};

export default initializeRedis;
