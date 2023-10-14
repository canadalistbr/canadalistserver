import { City } from "@prisma/client";
import { LoadCitiesRepository } from "../../../../data/protocols/load-cities/load-cities-repository";
import { prisma } from "../prisma";

export class CitiesPrismaRepository implements LoadCitiesRepository {
  loadAll(): Promise<City[]> {
    const cities = prisma.city.findMany({
      include: {
        provinces: true
      }
    });
    return cities;
  }
}
