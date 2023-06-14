import { Router } from "express";
import { FindCityController } from "../../presentation/controllers/cities/find-city";
import { DbFindCity } from "../../data/usecases/find-city/db-find-city";
import { DbCheckCityByName } from "../../data/usecases/load-provinces/db-check-city-name";
import { CitiesPrismaRepository } from "../../infra/db/prisma/cities-repository/load-cities-repository";
import { CityPrismaRepository } from "../../infra/db/prisma/city-repository/find-city-repository";
import { routeAdapter } from "../adapters/express-route-adapter";
import { makeFindCity } from "../factories/cities/find-city-factory";

export default (route: Router) => {
  route.get("/cities/:cityName", routeAdapter(makeFindCity()));
};
