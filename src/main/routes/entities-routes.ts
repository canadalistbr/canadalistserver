import { Router } from "express";
import { FindEntitiesController } from "../../presentation/controllers/entities/find-entities";
import { DbFindEntities } from "../../data/usecases/find-entities/db-find-entities";
import { EntitiesPrismaRepository } from "../../infra/db/prisma/find-entities-repository/find-entities-repository";
import { routeAdapter } from "../adapters/express-route-adapter";
import { makeFindEntities } from "../factories/entities/find-entities-factory";

export default (route: Router) => {
  route.get("/entities/:entityName", routeAdapter(makeFindEntities()));
};
