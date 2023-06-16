import { Entity } from "../../../domain/models";
import { Controller, HttpResponse } from "../../protocols";
import { SlugInsertion } from "../../protocols/slug-insertion";
import { FindEntities, ok, serverError } from "../provinces/protocols";

export class FindEntitiesController
  implements Controller<FindEntitiesController.Request>
{
  constructor(
    private readonly findEntities: FindEntities,
    private readonly addSlug: SlugInsertion<Entity>
  ) {}
  async handle(request: FindEntitiesController.Request): Promise<HttpResponse> {
    try {
      const { entityName } = request;
      const entities = await this.findEntities.findBy(entityName);
      const entitiesWithSlug = entities.map((entity) =>
        this.addSlug.add(entity)
      );
      return ok(entitiesWithSlug);
    } catch (error) {
      return serverError(error);
    }
  }
}

export namespace FindEntitiesController {
  export type Request = {
    entityName: string;
  };
}
