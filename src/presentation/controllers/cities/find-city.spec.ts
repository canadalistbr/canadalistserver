import { CityModel } from "../../../domain/models/cities";
import { CheckCityById } from "../../../domain/usecases/check-city-by-id";
import { FindCity } from "../../../domain/usecases/find-city";
import { forbidden, ok, serverError } from "../../helpers";
import { FindCityController } from "./find-city";

const makeFakeCity = (): CityModel => ({
  id: "1",
  costOfLiving: 3,
  imageUrl: "path",
  language: ["En, Fr"],
  name: "Montreal",
  overallScore: 9.9,
  provinceId: "quebecID",
  slug: "MTL",
});

const mockRequest: FindCityController.Request = {
  cityId: "23",
};
type SutType = {
  sut: FindCityController;
  findCityStub: FindCity;
  checkCityByIdStub: CheckCityById;
};
const makeSut = (): SutType => {
  class FindCityStub implements FindCity {
    find(id: string): Promise<CityModel> {
      return new Promise((resolve, reject) => resolve(makeFakeCity()));
    }
  }
  class CheckcityByIdStub implements CheckCityById {
    async check(id: string): Promise<boolean> {
      return new Promise((resolve) => resolve(true));
    }
  }
  const findCityStub = new FindCityStub();
  const checkCityByIdStub = new CheckcityByIdStub();
  const sut = new FindCityController(findCityStub, checkCityByIdStub);
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
    expect(response).toEqual(ok(makeFakeCity()));
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
