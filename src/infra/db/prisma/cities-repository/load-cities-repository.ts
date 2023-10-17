import { City } from "@prisma/client";
import { LoadCitiesRepository } from "../../../../data/protocols/load-cities/load-cities-repository";
import { prisma } from "../prisma";

export class CitiesPrismaRepository implements LoadCitiesRepository {
  loadAll(filters?: any): Promise<City[]> {
    const isBikeFriendly = Boolean(filters?.bikeFriendly)
    const hasNature = Boolean(filters?.nature)
    const hasFestivals = Boolean(filters?.festivals)
    const cities = prisma.city.findMany({
      where: {
        bikeFriendly: isBikeFriendly || {
        },
        nature: hasNature || {},
        festivals: hasFestivals ? {
          not: ''
        } : {}
      },
      include: {
        provinces: true
      }
    });
    return cities;
  }
}
