import { City, Province, Study } from "@prisma/client";

export interface CityModel extends City {
  study?: Study[];
  province?: Pick<Province, "short" | "name">;
}
