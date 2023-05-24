import { PrismaClient } from ".prisma/client";
import { LoadProvincesRepository } from "../../../../data/protocols";
import { ProvinceModel } from "../../../../domain/models";
import { PrismaHelper } from "../helpers/prisma-helper";

const prisma = new PrismaClient();

export class ProvincesPrismaRepository implements LoadProvincesRepository {
  async loadAll(): Promise<ProvinceModel[]> {
    const provinces = await PrismaHelper.getCollection("provinces");
    return provinces;
  }
}
