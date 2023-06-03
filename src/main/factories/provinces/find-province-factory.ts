import { DbCheckProvinceById } from "../../../data/usecases/load-provinces/db-check-province-id";
import { DbFindProvince } from "../../../data/usecases/load-provinces/db-find-province";
import { FindProvincePrismaRepository } from "../../../infra/db/prisma/province-repository/find-province-repository";
import { FindProvinceController } from "../../../presentation/controllers/provinces/find-province";

export function makeFindProvince() {
  const findProvinceRepository = new FindProvincePrismaRepository();
  const checkProvinceById = new DbCheckProvinceById(findProvinceRepository);
  const findProvinceUsecase = new DbFindProvince(findProvinceRepository);
  return new FindProvinceController(findProvinceUsecase, checkProvinceById);
}