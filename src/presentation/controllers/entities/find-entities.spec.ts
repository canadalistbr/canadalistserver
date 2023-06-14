import { FindEntities, ok, serverError } from "../provinces/protocols";
import { FindEntitiesController } from "./find-entities";

const makeFakeEntitiesFactory = (): any[] => {
  return [];
};
class FindEntitiesUsecaseStub implements FindEntities {
  findBy(entityName: string): Promise<any[]> {
    return new Promise((resolve) => resolve(makeFakeEntitiesFactory()));
  }
}

const request: FindEntitiesController.Request = {
  entityName: "Montreal",
};

describe("FindEntitiesController", () => {
  it("should call findBy usecase", () => {
    const findEntitiesUsecaseStub = new FindEntitiesUsecaseStub();
    const sut = new FindEntitiesController(findEntitiesUsecaseStub);
    const findBySpy = jest.spyOn(findEntitiesUsecaseStub, "findBy");
    sut.handle(request);
    expect(findBySpy).toHaveBeenCalled();
  });
  it("should return  200", async () => {
    const findEntitiesUsecaseStub = new FindEntitiesUsecaseStub();
    const sut = new FindEntitiesController(findEntitiesUsecaseStub);
    const findBySpy = jest.spyOn(findEntitiesUsecaseStub, "findBy");
    const httpResponse = await sut.handle(request);
    expect(httpResponse).toEqual(ok(makeFakeEntitiesFactory()));
  });

  it("throws a 500 on server error", async () => {
    const findEntitiesUsecaseStub = new FindEntitiesUsecaseStub();
    const sut = new FindEntitiesController(findEntitiesUsecaseStub);
    const findBySpy = jest
      .spyOn(findEntitiesUsecaseStub, "findBy")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error("")))
      );
    const httpResponse = await sut.handle(request);
    expect(httpResponse).toEqual(serverError(new Error("")));
  });
});
