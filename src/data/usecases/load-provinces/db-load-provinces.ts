import {
  LoadProvinces,
  LoadProvincesRepository,
  ProvinceModel,
} from "./protocols";

export class DbLoadProvinces implements LoadProvinces {
  constructor(
    private readonly loadProvincesRepository: LoadProvincesRepository
  ) {}
  async load(): Promise<ProvinceModel[]> {
    const data = await this.loadProvincesRepository.loadAll();
    return data;
  }
}
