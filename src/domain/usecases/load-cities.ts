import { CityModel } from "../models/cities";

export interface LoadCities {
  load(filters?: any): Promise<CityModel[]>;
}
