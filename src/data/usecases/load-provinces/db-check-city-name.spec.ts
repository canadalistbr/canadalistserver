import { CityModel } from "../../../domain/models/cities";
import { FindCity } from "../../../domain/usecases/find-city";
import { FindCityRepository } from "../../protocols/find-city/find-city-repository";
import { FindProvinceRepository } from "../../protocols/find-province/find-province-repository";
import { DbCheckCityByName } from "./db-check-city-name";
import { DbCheckProvinceById } from "./db-check-province-id";
import { ProvinceModel } from "./protocols";
const makeFakeCityFactory = (): CityModel => {
  return {
    id: "1",
    costOfLiving: 3,
    imageUrl: "url",
    language: ["en"],
    name: "Montreal",
    overallScore: 10,
    short: "MTL",
    provinceId: "3",
  };
};

type SutType = {
  findCityRepositoryStub: FindCityRepository;
  sut: DbCheckCityByName;
};

const makeSut = (): SutType => {
  class FindCityRepositoryStub implements FindCityRepository {
    findCityBy(name: string): Promise<CityModel> {
      return new Promise((resolve, reject) => resolve(makeFakeCityFactory()));
    }
  }

  const findCityRepositoryStub = new FindCityRepositoryStub();
  const sut = new DbCheckCityByName(findCityRepositoryStub);
  return {
    sut,
    findCityRepositoryStub,
  };
};

describe("", () => {
  it("calls repository", async () => {
    const { sut, findCityRepositoryStub: findProvinceRepositoryStub } =
      makeSut();
    const find = jest.spyOn(findProvinceRepositoryStub, "findCityBy");
    await sut.check("montreal");
    expect(find).toHaveBeenCalled();
  });
  it("returns true if city exists", async () => {
    const { sut } = makeSut();
    const response = await sut.check("montreal");
    expect(response).toBe(true);
  });

  it("returns false if city does not not exists", async () => {
    const { sut } = makeSut();
    await sut.check("montreal");
  });
});
