import { City } from "@prisma/client";
import { LoadCities } from "../../../domain/usecases/load-cities";
import { LoadCitiesRepository } from "../../protocols/load-cities/load-cities-repository";

export class DbLoadCities implements LoadCities {
  constructor(private readonly loadCitiesRepository: LoadCitiesRepository) { }
  async load(filters?: any): Promise<City[]> {
    const cities = await this.loadCitiesRepository.loadAll(filters);
    return cities;
  }
}
