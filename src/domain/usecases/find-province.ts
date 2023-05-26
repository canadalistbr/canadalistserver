import { ProvinceModel } from '../models'

export interface FindProvince {
  find(id: number): Promise<ProvinceModel>
}
