import { PrismaClient } from '@prisma/client';
import { logger } from './logger';

let prisma: PrismaClient | null = null;

export const connectDatabase = async (): Promise<PrismaClient> => {
  if (!prisma) {
    prisma = new PrismaClient({
      log: process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['error'],
      errorFormat: 'minimal',
    });

    try {
      await prisma.$connect();
      logger.info('✅ Database connected successfully');
    } catch (error) {
      logger.error('❌ Database connection failed:', error);
      throw error;
    }
  }

  return prisma;
};

export const disconnectDatabase = async (): Promise<void> => {
  if (prisma) {
    await prisma.$disconnect();
    logger.info('🔌 Database disconnected');
  }
};

export const getDatabase = (): PrismaClient => {
  if (!prisma) {
    throw new Error('Database not initialized. Call connectDatabase() first.');
  }
  return prisma;
};

// Initialize prisma for default export
const initializePrisma = async (): Promise<PrismaClient> => {
  return await connectDatabase();
};

export default initializePrisma;
