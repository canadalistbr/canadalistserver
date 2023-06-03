import { CityModel } from "../../../domain/models/cities";

export interface FindCityRepository {
  findCityBy(id: string): Promise<CityModel>;
}
