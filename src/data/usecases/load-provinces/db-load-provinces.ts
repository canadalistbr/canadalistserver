import { ProvinceModel } from "../../../domain/models";
import { LoadProvinces } from "../../../domain/usecases";
import { LoadProvincesRepository } from "../../protocols/provinces/load-provinces-repository";

export class DbLoadProvinces implements LoadProvinces {
  constructor(
    private readonly loadProvincesRepository: LoadProvincesRepository
  ) {}
  async load(): Promise<ProvinceModel[]> {
    const data = await this.loadProvincesRepository.loadAll();
    return data;
  }
}
