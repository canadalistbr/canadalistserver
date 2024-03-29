import { CityModel } from "../../../domain/models/cities";
import { CheckCityByName } from "../../../domain/usecases/check-city-by-name";
import { FindCity } from "../../../domain/usecases/find-city";
import { SlugInsertionUtil } from "../../../utils/add-slug/add-slug";
import { EntityNameSanitization } from "../../../utils/add-slug/sanitize-entity-name";
import { forbidden, ok, serverError } from "../../helpers";
import { FindCityController } from "./find-city";

const makeFakeCity = (): CityModel => ({
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
});

const mockRequest: FindCityController.Request = {
  cityName: "23",
};
type SutType = {
  sut: FindCityController;
  findCityStub: FindCity;
  checkCityByIdStub: CheckCityByName;
};
const makeSut = (): SutType => {
  class FindCityStub implements FindCity {
    find(id: string): Promise<CityModel> {
      return new Promise((resolve, reject) => resolve(makeFakeCity()));
    }
  }
  class CheckcityByIdStub implements CheckCityByName {
    async check(id: string): Promise<boolean> {
      return new Promise((resolve) => resolve(true));
    }
  }
  const findCityStub = new FindCityStub();
  const checkCityByIdStub = new CheckcityByIdStub();
  const nameSanitization = new EntityNameSanitization()
  const slug = new SlugInsertionUtil<CityModel>()
  const sut = new FindCityController(findCityStub, checkCityByIdStub, nameSanitization, slug);
  return {
    sut,
    findCityStub,
    checkCityByIdStub,
  };
};

describe("LoadcityController", () => {
  it("checks if city exists", async () => {
    const { checkCityByIdStub, sut } = makeSut();
    const check = jest.spyOn(checkCityByIdStub, "check");
    await sut.handle(mockRequest);
    expect(check).toHaveBeenCalled();
  });
  it("return a 403 if city does not exist", async () => {
    const { checkCityByIdStub, sut } = makeSut();
    jest
      .spyOn(checkCityByIdStub, "check")
      .mockReturnValueOnce(new Promise((resolve) => resolve(false)));
    const response = await sut.handle(mockRequest);
    expect(response).toEqual(forbidden("unauthorized"));
  });
  it("executes Loadcity usecase", async () => {
    const { findCityStub, sut } = makeSut();
    const load = jest.spyOn(findCityStub, "find");
    await sut.handle(mockRequest);
    expect(load).toHaveBeenCalled();
  });
  it("returns a 200 on success", async () => {
    const { sut } = makeSut();
    const response = await sut.handle(mockRequest);
    expect(response).toEqual(ok({ ...makeFakeCity(), slug: 'montreal' }));
  });
  it("should return 500 if Loadcitys throw", async () => {
    const { sut, findCityStub } = makeSut();
    jest
      .spyOn(findCityStub, "find")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error("error")))
      );
    const httpResponse = await sut.handle(mockRequest);
    expect(httpResponse).toEqual(serverError(new Error("error")));
  });
});
