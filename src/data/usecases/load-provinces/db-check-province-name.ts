import { CheckProvinceByName } from "../../../domain/usecases/check-province-by-name";
import { FindProvinceRepository } from "../../protocols/find-province/find-province-repository";
import { ProvinceModel } from "./protocols";

export class DbCheckProvinceByName implements CheckProvinceByName {
  constructor(private readonly findProvince: FindProvinceRepository) {}
  async check(name: string): Promise<boolean> {
    const province = await this.findProvince.findProvinceByName(name);
    if (province === null) return false;
    return true;
  }
  isEmpty(province: ProvinceModel) {
    return Object.keys(province).length === 0;
  }
}
