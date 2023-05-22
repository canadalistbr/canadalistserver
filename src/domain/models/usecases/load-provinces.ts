import { ProvinceModel } from "../provinces";

export interface LoadProvinces {
  load(): Promise<ProvinceModel[]>;
}
