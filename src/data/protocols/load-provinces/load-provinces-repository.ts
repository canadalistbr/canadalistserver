import { ProvinceModel } from "../../../domain/models";

export interface LoadProvincesRepository {
  loadAll(): Promise<ProvinceModel[]>;
}
