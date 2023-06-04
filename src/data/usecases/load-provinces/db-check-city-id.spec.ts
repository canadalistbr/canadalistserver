import { resolve } from "path";
import { FindProvinceRepository } from "../../protocols/find-province/find-province-repository";
import { DbCheckProvinceByName } from "./db-check-province-id";
import { ProvinceModel } from "./protocols";
const makeFakeProvinceFactory = (): ProvinceModel => {
  return {
    id: "1",
    capital: "quebec city",
    flagUrl: "randomUrl",
    imageUrl: "randomUrl",
    language: ["fr", "en"],
    immigrationRanking: 4,
    name: "Quebec",
    short: "Qc",
    topCities: ["montreal"],
  };
};

type SutType = {
  findProvinceRepositoryStub: FindProvinceRepository;
  sut: DbCheckProvinceByName;
};

const makeSut = (): SutType => {
  class FindProvinceRepositoryStub implements FindProvinceRepository {
    findProvinceByName(name: string): Promise<ProvinceModel> {
      return new Promise((resolve, reject) =>
        resolve(makeFakeProvinceFactory())
      );
    }
  }

  const findProvinceRepositoryStub = new FindProvinceRepositoryStub();
  const sut = new DbCheckProvinceByName(findProvinceRepositoryStub);
  return {
    sut,
    findProvinceRepositoryStub,
  };
};

describe("CheckProvinceByName`", () => {
  it("calls repository", async () => {
    const { sut, findProvinceRepositoryStub } = makeSut();
    const find = jest.spyOn(findProvinceRepositoryStub, "findProvinceByName");
    await sut.check("Quebec");
    expect(find).toHaveBeenCalled();
  });
  it("returns true if province exists", async () => {
    const { sut } = makeSut();
    const response = await sut.check("quebec");
    expect(response).toBe(true);
  });

  xit("returns false if province does not not exists", async () => {
    const { sut, findProvinceRepositoryStub } = makeSut();
    const find = jest
      .spyOn(findProvinceRepositoryStub, "findProvinceByName")
      .mockResolvedValueOnce(new Promise((req, reject) => reject(new Error())));
    await sut.check("random");
    expect(find).rejects.toThrow;
  });
});
