import { CityModel } from "../../../domain/models/cities";
import { LoadCities } from "../../../domain/usecases/load-cities";
import { ok, serverError } from "../../helpers";
import { LoadCitiesController } from "./load-cities";

const makeFakeCities = (): CityModel[] => {
  return [
    {
      id: "1",
      costOfLiving: 3,
      imageUrl: "path",
      language: ["En, Fr"],
      name: "Montreal",
      overallScore: 9.9,
      provinceId: "quebecID",
      short: "MTL",
    },
    {
      id: "2",
      costOfLiving: 3,
      imageUrl: "path",
      language: ["en"],
      name: "Vancouver",
      overallScore: 9.9,
      provinceId: "quebecID",
      short: "Van",
    },
  ];
};

type SutTypes = {
  sut: LoadCitiesController;
  loadProvincesStub: LoadCities;
};

const makeLoadProvinces = (): LoadCities => {
  class LoadProvincesStub implements LoadCities {
    async load(): Promise<CityModel[]> {
      return new Promise((promise) => promise(makeFakeCities()));
    }
  }

  return new LoadProvincesStub();
};

const makeSut = (): SutTypes => {
  const loadProvincesStub = makeLoadProvinces();
  const sut = new LoadCitiesController(loadProvincesStub);

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
    expect(httpResponse).toEqual(ok(makeFakeCities()));
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
