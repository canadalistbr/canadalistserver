import { FindProvinceRepository } from '../../../../data/protocols/find-province/find-province-repository'
import { ProvinceModel } from '../../../../domain/models'
import { PrismaHelper } from '../helpers/prisma-helper'

export class FindProvincePrismaRepository implements FindProvinceRepository {
  async findProvinceById(provinceId: number): Promise<ProvinceModel> {
    return PrismaHelper.getModelById('provinces', provinceId)
  }
}
