import { PrismaClient } from '../../generated/prisma';

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
// Learn more: https://pris.ly/d/help/next-js-best-practices

// Clear the global prisma instance to ensure we're using the latest schema
const globalForPrisma = global as unknown as { prisma: PrismaClient | undefined };

// Force a new instance to be created
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = undefined;
}

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
