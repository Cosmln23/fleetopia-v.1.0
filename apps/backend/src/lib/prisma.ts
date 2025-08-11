// Lazy import to avoid type errors if client isn't generated yet in CI
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import type { PrismaClient as PrismaClientType } from '@prisma/client';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { PrismaClient } = require('@prisma/client') as { PrismaClient: new () => PrismaClientType };

let prismaClient: PrismaClientType;

declare global {
  // eslint-disable-next-line no-var
  var __prisma__: PrismaClientType | undefined;
}

if (process.env.NODE_ENV === 'production') {
  prismaClient = new PrismaClient();
} else {
  if (!global.__prisma__) {
    global.__prisma__ = new PrismaClient();
  }
  prismaClient = global.__prisma__;
}

export default prismaClient;


