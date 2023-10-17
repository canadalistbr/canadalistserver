import { CityModel } from "../../../domain/models/cities";
import { LoadCitiesRepository } from "../../protocols/load-cities/load-cities-repository";
import { DbLoadCities } from "./db-load-cities";

const makeFakeCities = (): CityModel[] => {
  return [
    {
      id: "1",
      costOfLiving: "3",
      imageUrl: "path",
      language: ["En, Fr"],
      name: "Montreal",
      overallScore: 9.9,
      provinceId: "quebecID",
      short: "MTL",
      entity: "city",
      winter: 'Cold',
      bikeFriendly: true,
      festivals: 'jazz',
      immigrationDestinationRank: 1,
      industries: ['tech'],
      nature: true,
      population: 10000
    },
    {
      id: "1",
      costOfLiving: "3",
      imageUrl: "path",
      language: ["En, Fr"],
      name: "Montreal",
      overallScore: 9.9,
      provinceId: "quebecID",
      short: "MTL",
      entity: "city",
      winter: 'Cold',
      bikeFriendly: true,
      festivals: 'jazz',
      immigrationDestinationRank: 1,
      industries: ['tech'],
      nature: true,
      population: 10000
    },
  ];
};

class LoadCitiesRepositoryStyb implements LoadCitiesRepository {
  loadAll(): Promise<CityModel[]> {
    return new Promise((resolve) => resolve(makeFakeCities()));
  }
}

describe("DbLoadProvinces", () => {
  it("calls loadAll spy", async () => {
    const loadProvincesRepositoryStub = new LoadCitiesRepositoryStyb();
    const loadAllSpy = jest.spyOn(loadProvincesRepositoryStub, "loadAll");
    const sut = new DbLoadCities(loadProvincesRepositoryStub);
    await sut.load();
    expect(loadAllSpy).toHaveBeenCalled();
  });
  it("returns provinces", async () => {
    const loadProvincesRepositoryStub = new LoadCitiesRepositoryStyb();
    const sut = new DbLoadCities(loadProvincesRepositoryStub);
    const response = await sut.load();
    expect(response).toEqual(makeFakeCities());
  });
  it("throws in case of error", async () => {
    const loadProvincesRepositoryStub = new LoadCitiesRepositoryStyb();
    jest
      .spyOn(loadProvincesRepositoryStub, "loadAll")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      );
    const sut = new DbLoadCities(loadProvincesRepositoryStub);
    const promise = sut.load();
    await expect(promise).rejects.toThrow();
  });
});
