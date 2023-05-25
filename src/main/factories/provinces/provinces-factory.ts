import { DbLoadProvinces } from '../../../data/usecases/load-provinces/db-load-provinces'
import { ProvincesPrismaRepository } from '../../../infra/db/prisma/provinces-repository/provinces'
import { LoadProvincesController } from '../../../presentation/controllers/provinces/load-provinces'

export function makeProvinces() {
  const provincesPrismaRepository = new ProvincesPrismaRepository()
  const loadProvinces = new DbLoadProvinces(provincesPrismaRepository)
  return new LoadProvincesController(loadProvinces)
}
