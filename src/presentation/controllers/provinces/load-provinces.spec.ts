import { ProvinceModel } from "../../../domain/models";
import { LoadProvinces } from "../../../domain/usecases";
import { ok, serverError } from "../../helpers";
import { LoadProvincesController } from "./load-provinces";

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

type SutTypes = {
  sut: LoadProvincesController;
  loadProvincesStub: LoadProvinces;
};

const makeLoadProvinces = (): LoadProvinces => {
  class LoadProvincesStub implements LoadProvinces {
    async load(): Promise<ProvinceModel[]> {
      return new Promise((promise) => promise(makeFakeProvinces()));
    }
  }

  return new LoadProvincesStub();
};

const makeSut = (): SutTypes => {
  const loadProvincesStub = makeLoadProvinces();
  const sut = new LoadProvincesController(loadProvincesStub);

  return {
    loadProvincesStub,
    sut,
  };
};

describe("LoadProvincesController", () => {
  it("ensure load provinces is called", async () => {
    const { sut, loadProvincesStub } = makeSut();
    const loadSpy = jest.spyOn(loadProvincesStub, "load");
    await sut.handle({});
    expect(loadSpy).toHaveBeenCalled();
  });

  it("should return 200 on success", async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle({});
    expect(httpResponse).toEqual(ok(makeFakeProvinces()));
  });

  it("should return 500 if LoadProvinces throw", async () => {
    const { sut, loadProvincesStub } = makeSut();
    jest
      .spyOn(loadProvincesStub, "load")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error("sd")))
      );
    const httpResponse = await sut.handle({});
    expect(httpResponse).toEqual(serverError(new Error("sd")));
  });
});
