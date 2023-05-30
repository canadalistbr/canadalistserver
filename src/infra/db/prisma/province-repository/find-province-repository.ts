import { FindProvinceRepository } from "../../../../data/protocols/find-province/find-province-repository";
import { ProvinceModel } from "../../../../domain/models";
import { prisma } from "../prisma";
export class FindProvincePrismaRepository implements FindProvinceRepository {
  async findProvinceById(provinceId: string): Promise<ProvinceModel> {
    return await prisma.provinces.findUnique({
      where: {
        id: provinceId,
      },
      include: {
        Immigration: true,
        ProvinceOverview: true,
        Study: true,
        cities: true,
      },
    });
  }
}
