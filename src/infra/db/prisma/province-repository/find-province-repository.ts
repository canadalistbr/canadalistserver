import { FindProvinceRepository } from "../../../../data/protocols/find-province/find-province-repository";
import { ProvinceModel } from "../../../../domain/models";
import { prisma } from "../prisma";
export class FindProvincePrismaRepository implements FindProvinceRepository {
  async findProvinceById(provinceId: string): Promise<ProvinceModel> {
    return await prisma.province.findUnique({
      where: {
        id: provinceId,
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
