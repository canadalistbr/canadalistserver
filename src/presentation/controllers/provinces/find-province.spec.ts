import { ProvinceModel } from "../../../domain/models";
import { CheckProvinceByName } from "../../../domain/usecases/check-province-by-name";
import { FindProvince } from "../../../domain/usecases/find-province";
import { SlugInsertionUtil } from "../../../utils/add-slug/add-slug";
import { EntityNameSanitization } from "../../../utils/add-slug/sanitize-entity-name";
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
    short: "Qc",
    topCities: ["montreal"],
    entity: "province",
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
  provinceName: "23",
};
type SutType = {
  sut: FindProvinceController;
  loadProvinceStub: FindProvince;
  checkProvinceByIdStub: CheckProvinceByName;
};
const makeSut = (): SutType => {
  class LoadProvinceStub implements FindProvince {
    find(id: string): Promise<ProvinceModel> {
      return new Promise((resolve, reject) =>
        resolve(makeFakeProvinceFactory())
      );
    }
  }
  class CheckProvinceByIdStub implements CheckProvinceByName {
    async check(id: string): Promise<boolean> {
      return new Promise((resolve) => resolve(true));
    }
  }
  const loadProvinceStub = new LoadProvinceStub();
  const checkProvinceByIdStub = new CheckProvinceByIdStub();
  const addSlug = new SlugInsertionUtil<ProvinceModel>()
  const nameSanitization = new EntityNameSanitization()
  const sut = new FindProvinceController(
    loadProvinceStub,
    checkProvinceByIdStub,
    addSlug,
    nameSanitization
  );
  return {
    sut,
    loadProvinceStub,
    checkProvinceByIdStub,
  };
};

describe("LoadProvinceController", () => {
  it("checks if province exists", async () => {
    const { checkProvinceByIdStub, sut } = makeSut();
    const check = jest.spyOn(checkProvinceByIdStub, "check");
    await sut.handle(mockRequest);
    expect(check).toHaveBeenCalled();
  });
  it("return a 403 if province does not exist", async () => {
    const { checkProvinceByIdStub, sut } = makeSut();
    jest
      .spyOn(checkProvinceByIdStub, "check")
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
    expect(response).toEqual(ok({...makeFakeProvinceFactory(), slug:'quebec'}));
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
