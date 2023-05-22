import { ProvinceModel } from "../../../domain/models/provinces";
import { LoadProvinces } from "../../../domain/models/usecases/load-provinces";
import { LoadProvincesController } from "./load-provinces";

const makeFakeProvinces = (): ProvinceModel[] => {
  return [
    {
      id: 1,
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
      id: 2,
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

class LoadProvincesStub implements LoadProvinces {
  load(): Promise<ProvinceModel[]> {
    return new Promise((resolve) => resolve(makeFakeProvinces()));
  }
}

describe("LoadProvincesController", () => {
  it("", () => {
    const loadProvincesStub = new LoadProvincesStub();
    const sut = new LoadProvincesController(loadProvincesStub);
    const spy = jest.spyOn(loadProvincesStub, "load");
    const httpResponse = sut.handle({});
    expect(spy).toHaveBeenCalled();
  });

  it("returns 200", async () => {
    const loadProvincesStub = new LoadProvincesStub();
    const sut = new LoadProvincesController(loadProvincesStub);
    const spy = jest.spyOn(loadProvincesStub, "load");
    const httpResponse = await sut.handle({});
    expect(httpResponse).toEqual({
      statusCode: 200,
      body: makeFakeProvinces(),
    });
  });
  it("returns 500", async () => {
    const loadProvincesStub = new LoadProvincesStub();
    const sut = new LoadProvincesController(loadProvincesStub);
    const spy = jest
      .spyOn(loadProvincesStub, "load")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      );
    const httpResponse = await sut.handle({});
    expect(httpResponse).toEqual({
      statusCode: 500,
      body: new Error(),
    });
  });
});
