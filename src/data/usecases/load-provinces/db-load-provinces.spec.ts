import { ProvinceModel } from "../../../domain/models";
import { LoadProvincesRepository } from "../../protocols/load-provinces/load-provinces-repository";
import { DbLoadProvinces } from "./db-load-provinces";

const makeFakeProvinces = (): ProvinceModel[] => {
  return [
    {
      id: "1",
      capital: "quebec city",
      flag_url: "randomUrl",
      image_url: "randomUrl",
      language: ["fr", "en"],
      immigration_ranking: 4,
      name: "Quebec",
      slug: "Qc",
      top_cities: ["montreal"],
    },
    {
      id: "2",
      capital: "Ottawa",
      flag_url: "randomUrl",
      image_url: "randomUrl",
      language: ["fr", "en"],
      immigration_ranking: 2,
      name: "Ontario",
      slug: "On",
      top_cities: ["Toronto"],
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
