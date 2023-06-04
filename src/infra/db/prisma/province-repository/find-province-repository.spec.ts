import { FindProvincePrismaRepository } from "./find-province-repository";

describe("FindProvincePrismaRepository", () => {
  xit("the returned value is truthy", async () => {
    const sut = new FindProvincePrismaRepository();
    const response = await sut.findProvinceByName("Quebec");
    expect(response).toBeTruthy();
  });
});
