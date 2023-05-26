import { ProvinceModel } from '../../../domain/models'

export interface FindProvinceRepository {
  findProvinceById(id: number): Promise<ProvinceModel>
}
