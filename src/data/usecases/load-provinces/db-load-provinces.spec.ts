import { ProvinceModel } from "../../../domain/models";
import { LoadProvincesRepository } from "../../protocols/load-provinces/load-provinces-repository";
import { DbLoadProvinces } from "./db-load-provinces";

const makeFakeProvinces = (): ProvinceModel[] => {
  return [
    {
      id: "1",
      capital: "quebec city",
      flagUrl: "randomUrl",
      imageUrl: "randomUrl",
      language: ["fr", "en"],
      immigrationRanking: 4,
      name: "Quebec",
      slug: "Qc",
      topCities: ["montreal"],
    },
    {
      id: "2",
      capital: "Ottawa",
      flagUrl: "randomUrl",
      imageUrl: "randomUrl",
      language: ["fr", "en"],
      immigrationRanking: 2,
      name: "Ontario",
      slug: "On",
      topCities: ["Toronto"],
    },
  ];
};

class LoadProvincesRepositoryStub implements LoadProvincesRepository {
  loadAll(): Promise<ProvinceModel[]> {
    return new Promise((resolve) => resolve(makeFakeProvinces()));
  }
}

describe("DbLoadProvinces", () => {
  it("", async () => {
    const loadProvincesRepositoryStub = new LoadProvincesRepositoryStub();
    const loadAllSpy = jest.spyOn(loadProvincesRepositoryStub, "loadAll");
    const sut = new DbLoadProvinces(loadProvincesRepositoryStub);
    await sut.load();
    expect(loadAllSpy).toHaveBeenCalled();
  });

  it("returns provinces", async () => {
    const loadProvincesRepositoryStub = new LoadProvincesRepositoryStub();
    const sut = new DbLoadProvinces(loadProvincesRepositoryStub);
    const response = await sut.load();
    expect(response).toEqual(makeFakeProvinces());
  });
  it("", async () => {
    const loadProvincesRepositoryStub = new LoadProvincesRepositoryStub();
    jest
      .spyOn(loadProvincesRepositoryStub, "loadAll")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      );
    const sut = new DbLoadProvinces(loadProvincesRepositoryStub);
    const promise = sut.load();
    await expect(promise).rejects.toThrow();
  });
});
