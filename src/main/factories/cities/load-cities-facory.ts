import { DbLoadCities } from "../../../data/usecases/load-cities/db-load-cities";
import { CityModel } from "../../../domain/models/cities";
import { CitiesPrismaRepository } from "../../../infra/db/prisma/cities-repository/load-cities-repository";
import { LoadCitiesController } from "../../../presentation/controllers/cities/load-cities";
import { Controller, HttpRequest } from "../../../presentation/protocols";
import { SlugInsertionUtil } from "../../../utils/add-slug/add-slug";

export const makeLoadCities = (): Controller<HttpRequest> => {
  const addSlug = new SlugInsertionUtil<CityModel>();
  const loadCitiesRepository = new CitiesPrismaRepository();
  const loadCitiesUsecase = new DbLoadCities(loadCitiesRepository);
  return new LoadCitiesController(loadCitiesUsecase, addSlug);
};
