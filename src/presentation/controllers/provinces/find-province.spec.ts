import { ProvinceModel } from "../../../domain/models";
import { CheckProvinceByName } from "../../../domain/usecases/check-province-by-id";
import { FindProvince } from "../../../domain/usecases/find-province";
import {
  FindProvinceController,
  LoadProvinceController,
} from "./find-province";
import { forbidden, ok, serverError } from "./protocols";

const makeFakeProvinceFactory = (): ProvinceModel => {
  return {
    id: "1",
    capital: "quebec city",
    flagUrl: "randomUrl",
    imageUrl: "randomUrl",
    language: ["fr", "en"],
    immigrationRanking: 4,
    name: "Quebec",
    slug: "Qc",
    topCities: ["montreal"],
    cities: [],
    immigration: [],
    provinceOverview: {
      bannerUrl: "fakeUrl",
      id: "fakerId",
      provinceId: "1",
      ProvinceScores: [],
    },
  };
};
const mockRequest: LoadProvinceController.Request = {
  provinceName: "Quebec",
};
type SutType = {
  sut: FindProvinceController;
  loadProvinceStub: FindProvince;
  checkProvinceByNameStub: CheckProvinceByName;
};
const makeSut = (): SutType => {
  class LoadProvinceStub implements FindProvince {
    find(name: string): Promise<ProvinceModel> {
      return new Promise((resolve, reject) =>
        resolve(makeFakeProvinceFactory())
      );
    }
  }
  class CheckProvinceByNameStub implements CheckProvinceByName {
    async check(name: string): Promise<boolean> {
      return new Promise((resolve) => resolve(true));
    }
  }
  const loadProvinceStub = new LoadProvinceStub();
  const checkProvinceByNameStub = new CheckProvinceByNameStub();
  const sut = new FindProvinceController(
    loadProvinceStub,
    checkProvinceByNameStub
  );
  return {
    sut,
    loadProvinceStub,
    checkProvinceByNameStub,
  };
};

describe("LoadProvinceController", () => {
  it("checks if province exists", async () => {
    const { checkProvinceByNameStub, sut } = makeSut();
    const check = jest.spyOn(checkProvinceByNameStub, "check");
    await sut.handle(mockRequest);
    expect(check).toHaveBeenCalled();
  });
  it("return a 403 if province does not exist", async () => {
    const { checkProvinceByNameStub, sut } = makeSut();
    jest
      .spyOn(checkProvinceByNameStub, "check")
      .mockReturnValueOnce(new Promise((resolve) => resolve(false)));
    const response = await sut.handle(mockRequest);
    expect(response).toEqual(forbidden("unauthorized"));
  });
  it("executes LoadProvince usecase", async () => {
    const { loadProvinceStub, sut } = makeSut();
    const load = jest.spyOn(loadProvinceStub, "find");
    await sut.handle(mockRequest);
    expect(load).toHaveBeenCalled();
  });
  it("returns a 200 on success", async () => {
    const { sut } = makeSut();
    const response = await sut.handle(mockRequest);
    expect(response).toEqual(ok(makeFakeProvinceFactory()));
  });
  it("should return 500 if LoadProvinces throw", async () => {
    const { sut, loadProvinceStub } = makeSut();
    jest
      .spyOn(loadProvinceStub, "find")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error("error")))
      );
    const httpResponse = await sut.handle(mockRequest);
    expect(httpResponse).toEqual(serverError(new Error("error")));
  });
});
