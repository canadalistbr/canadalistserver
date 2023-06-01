import { FindProvinceRepository } from "../../protocols/find-province/find-province-repository";
import { DbCheckProvinceById } from "./db-check-province-id";
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
    slug: "Qc",
    topCities: ["montreal"],
  };
};

type SutType = {
  findProvinceRepositoryStub: FindProvinceRepository;
  sut: DbCheckProvinceById;
};

const makeSut = (): SutType => {
  class FindProvinceRepositoryStub implements FindProvinceRepository {
    findProvinceById(id: string): Promise<ProvinceModel> {
      return new Promise((resolve, reject) =>
        resolve(makeFakeProvinceFactory())
      );
    }
  }

  const findProvinceRepositoryStub = new FindProvinceRepositoryStub();
  const sut = new DbCheckProvinceById(findProvinceRepositoryStub);
  return {
    sut,
    findProvinceRepositoryStub,
  };
};

describe("", () => {
  it("calls repository", async () => {
    const { sut, findProvinceRepositoryStub } = makeSut();
    const find = jest.spyOn(findProvinceRepositoryStub, "findProvinceById");
    await sut.check("1");
    expect(find).toHaveBeenCalled();
  });
  it("returns true if province exists", async () => {
    const { sut } = makeSut();
    const response = await sut.check("1");
    expect(response).toBe(true);
  });

  it("returns false if province does not not exists", async () => {
    const { sut } = makeSut();
    await sut.check("1");
  });
});
