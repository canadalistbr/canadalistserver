import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import { FindProvinceController } from "../../presentation/controllers/provinces/find-province";
import { DbFindProvince } from "../../data/usecases/load-provinces/db-find-province";
import { checkPrime } from "crypto";
import { DbCheckProvinceByName } from "../../data/usecases/load-provinces/db-check-province-name";
import { FindProvincePrismaRepository } from "../../infra/db/prisma/province-repository/find-province-repository";
import { routeAdapter } from "../adapters/express-route-adapter";
import { makeFindProvince } from "../factories/provinces/find-province-factory";
import { makeProvinces } from "../factories/provinces/provinces-factory";

export default (route: Router) => {
  route.get("/provinces/:provinceId", routeAdapter(makeFindProvince()));
};
