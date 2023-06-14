import { FindEntitiesRepository } from "../../../../data/protocols";
import { Entity } from "../../../../domain/models";
import { prisma } from "../prisma";

export class EntitiesPrismaRepository implements FindEntitiesRepository {
  async find(name: string): Promise<Entity[]> {
    const cities = prisma.city.findMany({
      where: {
        OR: [{ name: { contains: name } }],
      },
      select: {
        name: true,
        entity: true,
      },
    });

    const provinces = prisma.province.findMany({
      where: {
        OR: [{ name: { contains: name } }],
      },
      select: {
        name: true,
        entity: true,
      },
    });
    const [provincesResponse, citiesResponse] = await Promise.all([
      provinces,
      cities,
    ]);
    const entities = [...provincesResponse, ...citiesResponse];
    return entities;
  }
}
