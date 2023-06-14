import { CityModel } from "../../../domain/models/cities";
import { CheckCityByName } from "../../../domain/usecases/check-city-by-name";
import { FindCityRepository } from "../../protocols/find-city/find-city-repository";

export class DbCheckCityByName implements CheckCityByName {
  constructor(private readonly findCity: FindCityRepository) {}
  async check(name: string): Promise<boolean> {
    const city = await this.findCity.findCityBy(name);
    if (city === null) return false;
    return true;
  }
  isEmpty(city: CityModel): boolean {
    return Object.keys(city).length === 0;
  }
}
