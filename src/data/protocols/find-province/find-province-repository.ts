import { ProvinceModel } from "../../../domain/models";

export interface FindProvinceRepository {
  findProvinceById(id: string): Promise<ProvinceModel>;
}
