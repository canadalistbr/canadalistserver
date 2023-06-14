import { City } from "@prisma/client";
import { FindCityRepository } from "../../../../data/protocols/find-city/find-city-repository";
import { prisma } from "../prisma";

export class CityPrismaRepository implements FindCityRepository {
  findCityBy(name: string): Promise<City> {
    return prisma.city.findFirst({
      where: {
        name,
      },
    });
  }
}
