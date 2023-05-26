import { ProvinceModel } from '../models'

export interface FindProvince {
  load(id: number): Promise<ProvinceModel>
}
