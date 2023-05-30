import {
  Immigration,
  ProvinceOverview,
  Study,
  cities,
  Provinces,
} from "@prisma/client";

export interface ProvinceModel extends Provinces {
  cities?: cities[];
  Immigration?: Immigration[];
  ProvinceOverview?: ProvinceOverview;
  Study?: Study[];
}
