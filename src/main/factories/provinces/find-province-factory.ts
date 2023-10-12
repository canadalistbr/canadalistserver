import { DbCheckProvinceByName } from "../../../data/usecases/load-provinces/db-check-province-name";
import { DbFindProvince } from "../../../data/usecases/load-provinces/db-find-province";
import { ProvinceModel } from "../../../domain/models";
import { FindProvincePrismaRepository } from "../../../infra/db/prisma/province-repository/find-province-repository";
import { FindProvinceController } from "../../../presentation/controllers/provinces/find-province";
import { SlugInsertionUtil } from "../../../utils/add-slug/add-slug";
import { EntityNameSanitization } from "../../../utils/add-slug/sanitize-entity-name";

export function makeFindProvince() {
  const findProvinceRepository = new FindProvincePrismaRepository();
  const nameSanitization = new EntityNameSanitization();
  const slugInsertion = new SlugInsertionUtil<ProvinceModel>()
  const checkProvinceById = new DbCheckProvinceByName(findProvinceRepository);
  const findProvinceUsecase = new DbFindProvince(findProvinceRepository);
  return new FindProvinceController(findProvinceUsecase, checkProvinceById,slugInsertion,nameSanitization);
}
