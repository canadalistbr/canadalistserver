import { City } from "@prisma/client";
import { FindCityRepository } from "../../../../data/protocols/find-city/find-city-repository";
import { prisma } from "../prisma";

export class CityPrismaRepository implements FindCityRepository {
  async findCityBy(cityName: string): Promise<City> {
    return await prisma.city.findFirst({
      where: {
        name: {
          equals: cityName,
          mode: 'insensitive'
        }
      },
      include: {
        cityOverview: {
          include: {
            scores: true
          }
        },
        provinces: true
      }
    });
  }
}
