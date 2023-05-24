import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
dotenv.config(); // Load environment variables from .env file

export const PrismaHelper = {
  prisma: new PrismaClient(),
  async connect() {
    await this.prisma.$connect();
  },
  async disconnect() {
    await this.prisma.$disconnect();
  },
  getCollection<T extends keyof PrismaClient>(name: T): Promise<any> {
    return this.prisma[name].findMany();
  },
};
