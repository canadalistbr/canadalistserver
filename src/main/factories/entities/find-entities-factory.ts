import { DbFindEntities } from "../../../data/usecases/find-entities/db-find-entities";
import { Entity } from "../../../domain/models";
import { EntitiesPrismaRepository } from "../../../infra/db/prisma/find-entities-repository/find-entities-repository";
import { FindEntitiesController } from "../../../presentation/controllers/entities/find-entities";
import { Controller } from "../../../presentation/protocols";
import { SlugInsertionUtil } from "../../../utils/add-slug/add-slug";

export const makeFindEntities =
  (): Controller<FindEntitiesController.Request> => {
    const addSlug = new SlugInsertionUtil<Entity>();
    const entitiesRepository = new EntitiesPrismaRepository();
    const findEntitiesUsecase = new DbFindEntities(entitiesRepository);
    return new FindEntitiesController(findEntitiesUsecase, addSlug);
  };
