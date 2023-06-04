import { FindProvince } from "../../../domain/usecases/find-province";
import { FindProvinceRepository } from "../../protocols/find-province/find-province-repository";
import { ProvinceModel } from "./protocols";

export class DbFindProvince implements FindProvince {
  constructor(
    private readonly findProvinceRepository: FindProvinceRepository
  ) {}
  async find(provinceName: string): Promise<ProvinceModel> {
    const province = await this.findProvinceRepository.findProvinceByName(
      provinceName
    );
    return province;
  }
}

export namespace DbFindProvince {
  export type Request = {
    provinceName: string;
  };
}
