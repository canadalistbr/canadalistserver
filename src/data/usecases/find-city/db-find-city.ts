import { City } from "@prisma/client";
import { FindCity } from "../../../domain/usecases/find-city";
import { FindCityRepository } from "../../protocols/find-city/find-city-repository";

export class DbFindCity implements FindCity {
  constructor(private readonly findCityRepository: FindCityRepository) {}
  async find(id: string): Promise<City> {
    const city = await this.findCityRepository.findCityBy(id);
    return city;
  }
}
