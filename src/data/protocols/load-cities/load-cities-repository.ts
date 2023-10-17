import { CityModel } from "../../../domain/models/cities";

export interface LoadCitiesRepository {
  loadAll(filters?: any): Promise<CityModel[]>;
}
