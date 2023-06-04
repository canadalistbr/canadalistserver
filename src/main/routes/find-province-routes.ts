import { Router } from "express";
import { routeAdapter } from "../adapters/express-route-adapter";
import { makeFindProvince } from "../factories/provinces/find-province-factory";


export default (route: Router) => {
  route.get("/province/:provinceId", routeAdapter(makeFindProvince()));
};
