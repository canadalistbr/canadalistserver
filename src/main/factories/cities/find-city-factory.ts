import { DbFindCity } from "../../../data/usecases/find-city/db-find-city";
import { DbCheckCityByName } from "../../../data/usecases/load-provinces/db-check-city-name";
import { CityModel } from "../../../domain/models/cities";
import { CityPrismaRepository } from "../../../infra/db/prisma/city-repository/find-city-repository";
import { FindCityController } from "../../../presentation/controllers/cities/find-city";
import { SlugInsertionUtil } from "../../../utils/add-slug/add-slug";
import { EntityNameSanitization } from "../../../utils/add-slug/sanitize-entity-name";

export const makeFindCity = () => {
  const findCityRepository = new CityPrismaRepository();
  const nameSanitization = new EntityNameSanitization();
  const addSlug = new SlugInsertionUtil<CityModel>()
  const checkCitByName = new DbCheckCityByName(findCityRepository);
  const findCityUsecase = new DbFindCity(findCityRepository);
  return new FindCityController(findCityUsecase, checkCitByName,nameSanitization,addSlug);
};
