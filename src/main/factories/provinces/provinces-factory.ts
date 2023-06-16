import { DbLoadProvinces } from "../../../data/usecases/load-provinces/db-load-provinces";
import { ProvinceModel } from "../../../domain/models";
import { ProvincesPrismaRepository } from "../../../infra/db/prisma/provinces-repository/provinces";
import { LoadProvincesController } from "../../../presentation/controllers/provinces/load-provinces";
import { SlugInsertionUtil } from "../../../utils/add-slug/add-slug";

export function makeProvinces() {
  const addSlug = new SlugInsertionUtil<ProvinceModel>();
  const provincesPrismaRepository = new ProvincesPrismaRepository();
  const loadProvinces = new DbLoadProvinces(provincesPrismaRepository);
  return new LoadProvincesController(loadProvinces, addSlug);
}
