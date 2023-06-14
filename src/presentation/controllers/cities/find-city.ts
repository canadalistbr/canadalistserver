import { CheckCityByName } from "../../../domain/usecases/check-city-by-name";
import { FindCity } from "../../../domain/usecases/find-city";
import { EntityNameSanitizer } from "../../../utils/sanitize-entity/sanitize-entity-name";
import { forbidden, ok, serverError } from "../../helpers";
import { Controller, HttpRequest, HttpResponse } from "../../protocols";

export class FindCityController
  implements Controller<FindCityController.Request>
{
  constructor(
    private readonly findCity: FindCity,
    private readonly checkCityName: CheckCityByName,
    private readonly sanitizeCityName: EntityNameSanitizer
  ) {}
  async handle(request: FindCityController.Request): Promise<HttpResponse> {
    try {
      const { cityName } = request;
      const name = this.sanitizeCityName.sanitize(cityName);
      const isValidName = await this.checkCityName.check(name);
      if (!isValidName) {
        return forbidden("unauthorized");
      }
      const city = await this.findCity.find(name);
      return ok(city);
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
