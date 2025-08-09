import { PrismaClient } from '@prisma/client';

let prismaClient: PrismaClient;

declare global {
  // eslint-disable-next-line no-var
  var __prisma__: PrismaClient | undefined;
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


