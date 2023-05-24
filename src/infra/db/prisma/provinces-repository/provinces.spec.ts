import { PrismaClient } from ".prisma/client";
import { ProvincesPrismaRepository } from "./provinces";

async function cleanup() {
  await PrismaHelper.disconnect();
}
import dotenv from "dotenv";
import { PrismaHelper } from "../helpers/prisma-helper";
dotenv.config(); // Load environment variables from .env file

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

afterAll(() => {
  cleanup();
});

describe("ProvincesPrismaRepository", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should load all provinces", async () => {
    const sut = new ProvincesPrismaRepository();
    const response = await sut.loadAll();
    expect(response).toBeTruthy();
  });
});
