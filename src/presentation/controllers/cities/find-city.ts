import { CityModel } from "../../../domain/models/cities";
import { CheckCityByName } from "../../../domain/usecases/check-city-by-name";
import { FindCity } from "../../../domain/usecases/find-city";
import { EntityNameSanitization } from "../../../utils/add-slug/sanitize-entity-name";
import { forbidden, ok, serverError } from "../../helpers";
import { Controller, HttpRequest, HttpResponse } from "../../protocols";
import { SlugInsertion } from "../../protocols/slug-insertion";

export class FindCityController
  implements Controller<FindCityController.Request>
{
  constructor(
    private readonly findCity: FindCity,
    private readonly checkCitykByName: CheckCityByName,
    private readonly nameSanitization: EntityNameSanitization,
    private readonly slugInsertion: SlugInsertion<CityModel>
  ) {}
  async handle(request: FindCityController.Request): Promise<HttpResponse> {
    try {
      const { cityName } = request;
      const sanitizedName = this.nameSanitization.sanitize(cityName)
      const isValidIName = await this.checkCitykByName.check(sanitizedName);
      if (!isValidIName) {
        return forbidden("unauthorized");
      }
      const city = await this.findCity.find(sanitizedName);
      const cityWithSlug = this.slugInsertion.add(city)
      return ok(cityWithSlug);
    } catch (error) {
      return serverError(error);
    }
  }
}

export namespace FindCityController {
  export type Request = {
    cityName: string;
  };
}
