import { ProvinceModel } from "../models";

export interface FindProvince {
  find(id: string): Promise<ProvinceModel>;
}
