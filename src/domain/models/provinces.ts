import {
  Immigration,
  ProvinceOverview,
  Study,
  cities,
  Provinces,
  ProvinceScores,
} from "@prisma/client";

type Overview = ProvinceOverview & {
  ProvinceScores: ProvinceScores[];
};
export interface ProvinceModel extends Provinces {
  cities?: cities[];
  Immigration?: Immigration[];
  ProvinceOverview?: Overview;
  Study?: Study[];
}
