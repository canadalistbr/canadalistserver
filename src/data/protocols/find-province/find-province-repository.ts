import { ProvinceModel } from "../../../domain/models";

export interface FindProvinceRepository {
  findProvinceByName(name: string): Promise<ProvinceModel>;
}
