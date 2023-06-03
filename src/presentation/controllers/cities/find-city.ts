import { CheckCityById } from "../../../domain/usecases/check-city-by-id";
import { FindCity } from "../../../domain/usecases/find-city";
import { forbidden, ok, serverError } from "../../helpers";
import { Controller, HttpRequest, HttpResponse } from "../../protocols";

export class FindCityController
  implements Controller<FindCityController.Request>
{
  constructor(
    private readonly findCity: FindCity,
    private readonly checkCitykById: CheckCityById
  ) {}
  async handle(request: FindCityController.Request): Promise<HttpResponse> {
    try {
      const { cityId } = request;
      const isValidId = await this.checkCitykById.check(cityId);
      if (!isValidId) {
        return forbidden("unauthorized");
      }
      const city = await this.findCity.find(cityId);
      return ok(city);
    } catch (error) {
      return serverError(error);
    }
  }
}

export namespace FindCityController {
  export type Request = {
    cityId: string;
  };
}
