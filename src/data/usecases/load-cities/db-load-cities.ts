import { City } from "@prisma/client";
import { LoadCities } from "../../../domain/usecases/load-cities";
import { LoadCitiesRepository } from "../../protocols/load-cities/load-cities-repository";
import { ok } from "../../../presentation/helpers";

export class DbLoadCities implements LoadCities {
  constructor(private readonly loadCitiesRepository: LoadCitiesRepository) {}
  async load(): Promise<City[]> {
    const cities = await this.loadCitiesRepository.loadAll();
    return cities;
  }
}
