import { CityModel } from "../../../domain/models/cities";
import { FindCityRepository } from "../../protocols/find-city/find-city-repository";
import { DbFindCity } from "./db-find-city";

const makeFakeCity = (): CityModel => ({
  id: "1",
  costOfLiving: 3,
  imageUrl: "path",
  language: ["En, Fr"],
  name: "Montreal",
  overallScore: 9.9,
  provinceId: "quebecID",
  short: "MTL",
});

const cityId = "1";

type SutType = {
  sut: DbFindCity;
  findCityRepositoryStub: FindCityRepository;
};
const makeSut = (): SutType => {
  class FindCityRepositoryStub implements FindCityRepository {
    findCityBy(id: string): Promise<CityModel> {
      return new Promise((resolve, reject) => resolve(makeFakeCity()));
    }
  }

  const findCityRepositoryStub = new FindCityRepositoryStub();
  const sut = new DbFindCity(findCityRepositoryStub);
  return {
    sut,
    findCityRepositoryStub,
  };
};
describe("DbFindProvince", () => {
  it("calls repository", async () => {
    const { sut, findCityRepositoryStub: findProvinceRepositoryStub } =
      makeSut();
    const findCity = jest.spyOn(findProvinceRepositoryStub, "findCityBy");
    await sut.find("1");
    expect(findCity).toHaveBeenCalled();
  });

  it("returns the request province", async () => {
    const { sut } = makeSut();
    const response = await sut.find(cityId);
    expect(response).toEqual(makeFakeCity());
  });

  it("throws on error", async () => {
    const { sut, findCityRepositoryStub: findProvinceRepositoryStub } =
      makeSut();
    const response = await sut.find(cityId);
    const find = jest
      .spyOn(findProvinceRepositoryStub, "findCityBy")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      );
    expect(find).rejects.toThrow();
  });
});
