import { CityModel } from "../models/cities";

export interface LoadCities {
  load(): Promise<CityModel[]>;
}
