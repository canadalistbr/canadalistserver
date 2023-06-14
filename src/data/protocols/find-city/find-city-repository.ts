import { CityModel } from "../../../domain/models/cities";

export interface FindCityRepository {
  findCityBy(name: string): Promise<CityModel>;
}
