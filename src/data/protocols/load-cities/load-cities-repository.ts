import { CityModel } from "../../../domain/models/cities";

export interface LoadCitiesRepository {
  loadAll(): Promise<CityModel[]>;
}
