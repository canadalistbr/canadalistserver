import { DbFindCity } from "../../../data/usecases/find-city/db-find-city";
import { DbCheckCityByName } from "../../../data/usecases/load-provinces/db-check-city-name";
import { CityPrismaRepository } from "../../../infra/db/prisma/city-repository/find-city-repository";
import { FindCityController } from "../../../presentation/controllers/cities/find-city";
import { EntityNameSanitizer } from "../../../utils/sanitize-entity/sanitize-entity-name";

export const makeFindCity = () => {
  const entityNameSanitizer = new EntityNameSanitizer();
  const findCityRepository = new CityPrismaRepository();
  const checkCitById = new DbCheckCityByName(findCityRepository);
  const findCityUsecase = new DbFindCity(findCityRepository);
  return new FindCityController(
    findCityUsecase,
    checkCitById,
    entityNameSanitizer
  );
};
