import { CityModel } from "../../../domain/models/cities";
import { CheckCityById } from "../../../domain/usecases/check-city-by-id";
import { FindCityRepository } from "../../protocols/find-city/find-city-repository";

export class DbCheckCityById implements CheckCityById {
  constructor(private readonly findCity: FindCityRepository) {}
  async check(id: string): Promise<boolean> {
    const city = await this.findCity.findCItyby(id);
    if (city === null) return false;
    return true;
  }
  isEmpty(city: CityModel): boolean {
    return Object.keys(city).length === 0;
  }
}
