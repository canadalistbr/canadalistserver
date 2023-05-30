import { CheckProvinceById } from "../../../domain/usecases/check-province-by-id";
import { FindProvinceRepository } from "../../protocols/find-province/find-province-repository";
import { ProvinceModel } from "./protocols";

export class DbCheckProvinceById implements CheckProvinceById {
  constructor(private readonly findProvince: FindProvinceRepository) {}
  async check(id: string): Promise<boolean> {
    const province = await this.findProvince.findProvinceById(id);
    if (province === null) return false;
    return true;
  }
  isEmpty(province: ProvinceModel) {
    return Object.keys(province).length === 0;
  }
}
