import { DbFindEntities } from "../../../data/usecases/find-entities/db-find-entities";
import { EntitiesPrismaRepository } from "../../../infra/db/prisma/find-entities-repository/find-entities-repository";
import { FindEntitiesController } from "../../../presentation/controllers/entities/find-entities";
import { Controller } from "../../../presentation/protocols";

export const makeFindEntities =
  (): Controller<FindEntitiesController.Request> => {
    const entitiesRepository = new EntitiesPrismaRepository();
    const findEntitiesUsecase = new DbFindEntities(entitiesRepository);
    return new FindEntitiesController(findEntitiesUsecase);
  };
