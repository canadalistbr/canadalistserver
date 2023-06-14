import { FindEntitiesRepository } from "../../protocols";
import { DbFindEntities } from "./db-find-entities";
class FindEntitiesRepositoryStub implements FindEntitiesRepository {
  find(name: string): Promise<any[]> {
    return new Promise((resolve, reject) => resolve([]));
  }
}
describe("", () => {
  it("should call repository", () => {
    const findEntitiesRepositoryStub = new FindEntitiesRepositoryStub();
    const sut = new DbFindEntities(findEntitiesRepositoryStub);
    const findAllSpy = jest.spyOn(findEntitiesRepositoryStub, "find");
    sut.findBy("montreal");
    expect(findAllSpy).toHaveBeenCalledWith("montreal");
  });
  it("returns the request province", async () => {
    const findEntitiesRepositoryStub = new FindEntitiesRepositoryStub();
    const sut = new DbFindEntities(findEntitiesRepositoryStub);
    const findAllSpy = jest.spyOn(findEntitiesRepositoryStub, "find");
    const response = await sut.findBy("montreal");
    expect(response).toEqual([]);
  });
  it("throws on error", async () => {
    const findEntitiesRepositoryStub = new FindEntitiesRepositoryStub();
    const sut = new DbFindEntities(findEntitiesRepositoryStub);
    const findAllSpy = jest
      .spyOn(findEntitiesRepositoryStub, "find")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      );
    expect(findAllSpy).rejects.toThrow();
  });
});
