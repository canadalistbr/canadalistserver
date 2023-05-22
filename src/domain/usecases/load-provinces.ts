import { ProvinceModel } from "../models";
export interface LoadProvinces {
  load(): Promise<ProvinceModel[]>;
}
