import { Router } from "express";
import { routeAdapter } from "../adapters/express-route-adapter";
import { makeLoadCities } from "../factories/cities/load-cities-factory";

export default (route: Router) => {
  route.get("/cities", routeAdapter(makeLoadCities()));
};
