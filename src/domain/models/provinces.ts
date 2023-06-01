import {
  Immigration,
  ProvinceOverview,
  Study,
  City,
  Province,
  ProvinceScore,
} from "@prisma/client";

type Overview = ProvinceOverview & {
  ProvinceScores: ProvinceScore[];
};
export interface ProvinceModel extends Province {
  cities?: City[];
  immigration?: Immigration[];
  provinceOverview?: Overview;
  study?: Study[];
}
