import { Router } from "express";
import { routeAdapter } from "../adapters/express-route-adapter";
import { makeLoadCities } from "../factories/cities/load-provinces-facory";

export default (route: Router) => {
  route.get("/cities", routeAdapter(makeLoadCities()));
};
