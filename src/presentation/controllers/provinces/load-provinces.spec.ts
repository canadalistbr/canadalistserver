import { ProvinceModel } from "../../../domain/models";
import { LoadProvinces } from "../../../domain/usecases";
import { ok, serverError } from "../../helpers";
import { ModelWithSlug, SlugInsertion } from "../../protocols/slug-insertion";
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
      short: "Qc",
      topCities: ["montreal"],
      entity: "province",
    },
    {
      id: "2",
      capital: "Ottawa",
      flagUrl: "randomUrl",
      imageUrl: "randomUrl",
      language: ["fr", "en"],
      immigrationRanking: 2,
      name: "Ontario",
      short: "On",
      topCities: ["Toronto"],
      entity: "province",
    },
  ];
};

type SutTypes = {
  sut: LoadProvincesController;
  loadProvincesStub: LoadProvinces;
  addSlug: SlugInsertion<ProvinceModel>;
};

const makeLoadProvinces = (): LoadProvinces => {
  class LoadProvincesStub implements LoadProvinces {
    async load(): Promise<ProvinceModel[]> {
      return new Promise((promise) => promise(makeFakeProvinces()));
    }
  }
  return new LoadProvincesStub();
};

const makeAddSlug = (): SlugInsertion<ProvinceModel> => {
  class SlugInsertionStub implements SlugInsertion<ProvinceModel> {
    add(model: ProvinceModel): ModelWithSlug<ProvinceModel> {
      return {
        ...model,
        slug: "slug",
      };
    }
  }

  return new SlugInsertionStub();
};

const makeSut = (): SutTypes => {
  const loadProvincesStub = makeLoadProvinces();
  const addSlug = makeAddSlug();
  const sut = new LoadProvincesController(loadProvincesStub, addSlug);

  return {
    loadProvincesStub,
    sut,
    addSlug,
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
    expect(httpResponse).toEqual(
      ok(makeFakeProvinces().map((province) => ({ ...province, slug: "slug" })))
    );
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
  it("calls with model", async () => {
    const { sut, addSlug } = makeSut();
    const add = jest.spyOn(addSlug, "add");
    await sut.handle({});
    expect(add).toHaveBeenCalled();
  });
});
