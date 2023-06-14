import { Province } from "@prisma/client";
import { CityModel } from "./cities";
import { ProvinceModel } from "./provinces";

export type Entity = {
  name: string;
  entity: string;
};
