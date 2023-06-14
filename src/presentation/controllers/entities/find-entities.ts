import { Controller, HttpResponse } from "../../protocols";
import { FindEntities, ok, serverError } from "../provinces/protocols";

export class FindEntitiesController
  implements Controller<FindEntitiesController.Request>
{
  constructor(private readonly findEntities: FindEntities) {}
  async handle(request: FindEntitiesController.Request): Promise<HttpResponse> {
    try {
      const { entityName } = request;
      const entities = await this.findEntities.findBy(entityName);
      return ok(entities);
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
