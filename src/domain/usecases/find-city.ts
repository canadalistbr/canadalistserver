import { CityModel } from "../models/cities";

export interface FindCity {
  find(id: string): Promise<CityModel>;
}
