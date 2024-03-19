import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  //log queries, info, warn, and error messages to the console
  return new PrismaClient({
    log: ["query", "info", "warn", "error"],
  });
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;
