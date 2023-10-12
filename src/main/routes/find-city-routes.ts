import { Router } from "express";
import { routeAdapter } from "../adapters/express-route-adapter";
import { makeFindCity } from "../factories/cities/find-city-factory";

export default (route: Router) => {
  route.get("/cities/:cityName", routeAdapter(makeFindCity()));
};
