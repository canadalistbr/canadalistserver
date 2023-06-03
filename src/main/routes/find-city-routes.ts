import { Router } from "express";
import { FindCityController } from "../../presentation/controllers/cities/find-city";
import { DbFindCity } from "../../data/usecases/find-city/db-find-city";
import { DbCheckCityById } from "../../data/usecases/load-provinces/db-check-city-id ";
import { CitiesPrismaRepository } from "../../infra/db/prisma/cities-repository/load-cities-repository";
import { CityPrismaRepository } from "../../infra/db/prisma/city-repository/find-city-repository";
import { routeAdapter } from "../adapters/express-route-adapter";
import { makeFindCity } from "../factories/cities/find-city-factory";

export default (route: Router) => {
  route.get("/cities/:cityId", routeAdapter(makeFindCity()));
};
