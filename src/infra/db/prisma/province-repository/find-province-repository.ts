import { FindProvinceRepository } from "../../../../data/protocols/find-province/find-province-repository";
import { ProvinceModel } from "../../../../domain/models";
import { prisma } from "../prisma";
export class FindProvincePrismaRepository implements FindProvinceRepository {
  async findProvinceByName(provinceName: string): Promise<ProvinceModel> {
    return await prisma.province.findFirst({
      where: {
        name: {
           equals: provinceName,
           mode: 'insensitive'
        },
        
      },
      include: {
        immigration: true,
        overview: {
          include: {
            scores: true,
          },
        },
        study: true,
        cities: true,
      },
    });
  }
}
