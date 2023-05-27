import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import { FindProvinceController } from "../../presentation/controllers/provinces/find-province";
import { DbFindProvince } from "../../data/usecases/load-provinces/db-find-province";
import { checkPrime } from "crypto";
import { DbCheckProvinceById } from "../../data/usecases/load-provinces/db-check-province-id";
import { FindProvincePrismaRepository } from "../../infra/db/prisma/province-repository/find-province-repository";

export default (route: Router) => {
  route.get("/provinces/:provinceId", async (req, res) => {
    const provinceId = Number(req.params.provinceId);
    const findProvinceRepository = new FindProvincePrismaRepository();
    const checkProvinceById = new DbCheckProvinceById(findProvinceRepository);
    const findProvinceUsecase = new DbFindProvince(findProvinceRepository);
    const findProvinceController = new FindProvinceController(
      findProvinceUsecase,
      checkProvinceById
    );
    const { body, statusCode } = await findProvinceController.handle({
      provinceId,
    });
    return res.status(statusCode).json(body);
  });
};
