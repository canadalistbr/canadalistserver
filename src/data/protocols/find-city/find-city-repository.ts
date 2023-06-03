import { CityModel } from "../../../domain/models/cities";

export interface FindCityRepository {
  findCItyby(id: string): Promise<CityModel>;
}
