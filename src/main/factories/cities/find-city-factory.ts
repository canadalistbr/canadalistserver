import { DbFindCity } from "../../../data/usecases/find-city/db-find-city";
import { DbCheckCityByName } from "../../../data/usecases/load-provinces/db-check-city-name";
import { CityPrismaRepository } from "../../../infra/db/prisma/city-repository/find-city-repository";
import { FindCityController } from "../../../presentation/controllers/cities/find-city";

export const makeFindCity = () => {
  const findCityRepository = new CityPrismaRepository();
  const checkCitByName = new DbCheckCityByName(findCityRepository);
  const findCityUsecase = new DbFindCity(findCityRepository);
  return new FindCityController(findCityUsecase, checkCitByName);
};
