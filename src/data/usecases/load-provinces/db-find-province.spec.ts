import { FindProvinceRepository } from "../../protocols/find-province/find-province-repository";
import { DbFindProvince } from "./db-find-province";
import { ProvinceModel } from "./protocols";

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
    entity: "city",
  };
};

const provinceId = "1";

type SutType = {
  sut: DbFindProvince;
  findProvinceRepositoryStub: FindProvinceRepository;
};
const makeSut = (): SutType => {
  class FindProvinceRepositoryStub implements FindProvinceRepository {
    findProvinceByName(id: string): Promise<ProvinceModel> {
      return new Promise((resolve, reject) =>
        resolve(makeFakeProvinceFactory())
      );
    }
  }

  const findProvinceRepositoryStub = new FindProvinceRepositoryStub();
  const sut = new DbFindProvince(findProvinceRepositoryStub);
  return {
    sut,
    findProvinceRepositoryStub,
  };
};
describe("DbFindProvince", () => {
  it("calls repository", async () => {
    const { sut, findProvinceRepositoryStub } = makeSut();
    const find = jest.spyOn(findProvinceRepositoryStub, 'findProvinceByName');
    await sut.find("1");
    expect(find).toHaveBeenCalled();
  });

  it("returns the request province", async () => {
    const { sut, findProvinceRepositoryStub } = makeSut();
    const response = await sut.find(provinceId);
    expect(response).toEqual(makeFakeProvinceFactory());
  });

  it("throws on error", async () => {
    const { sut, findProvinceRepositoryStub } = makeSut();
    const response = await sut.find(provinceId);
    const find = jest
      .spyOn(findProvinceRepositoryStub, 'findProvinceByName')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      );
    expect(find).rejects.toThrow();
  });
});
