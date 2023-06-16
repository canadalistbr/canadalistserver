import { Entity } from "../../../domain/models";
import { ModelWithSlug, SlugInsertion } from "../../protocols/slug-insertion";
import { FindEntities, ok, serverError } from "../provinces/protocols";
import { FindEntitiesController } from "./find-entities";

const makeFakeEntitiesFactory = (): Entity[] => {
  return [
    {
      entity: "province",
      name: "Quebec",
    },
  ];
};

const request: FindEntitiesController.Request = {
  entityName: "en",
};

type SutType = {
  sut: FindEntitiesController;
  findEntitiesUsecaseStub: FindEntities;
  addSlug: SlugInsertion<Entity>;
};
const makeSut = (): SutType => {
  class FindEntitiesUsecaseStub implements FindEntities {
    findBy(entityName: string): Promise<any[]> {
      return new Promise((resolve) => resolve(makeFakeEntitiesFactory()));
    }
  }

  class SlugInsertionStub implements SlugInsertion<Entity> {
    add(model: Entity): ModelWithSlug<Entity> {
      return {
        ...model,
        slug: "slug",
      };
    }
  }
  const findEntitiesUsecaseStub = new FindEntitiesUsecaseStub();
  const addSlug = new SlugInsertionStub();
  const sut = new FindEntitiesController(findEntitiesUsecaseStub, addSlug);

  return {
    findEntitiesUsecaseStub,
    sut,
    addSlug,
  };
};

describe("FindEntitiesController", () => {
  it("should call findBy usecase", () => {
    const { sut, findEntitiesUsecaseStub } = makeSut();
    const findBySpy = jest.spyOn(findEntitiesUsecaseStub, "findBy");
    sut.handle(request);
    expect(findBySpy).toHaveBeenCalled();
  });
  it("should return  200", async () => {
    const { sut, findEntitiesUsecaseStub } = makeSut();
    jest.spyOn(findEntitiesUsecaseStub, "findBy");
    const httpResponse = await sut.handle(request);
    expect(httpResponse).toEqual(
      ok(
        makeFakeEntitiesFactory().map((entity) => ({ ...entity, slug: "slug" }))
      )
    );
  });

  it("throws a 500 on server error", async () => {
    const { sut, findEntitiesUsecaseStub } = makeSut();
    jest
      .spyOn(findEntitiesUsecaseStub, "findBy")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error("")))
      );
    const httpResponse = await sut.handle(request);
    expect(httpResponse).toEqual(serverError(new Error("")));
  });
  it("should call addSlug", async () => {
    const { sut, addSlug } = makeSut();
    const add = jest.spyOn(addSlug, "add");
    await sut.handle(request);
    expect(add).toHaveBeenCalled();
  });
});
