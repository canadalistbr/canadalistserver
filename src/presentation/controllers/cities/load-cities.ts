import { LoadCities } from "../../../domain/usecases/load-cities";
import { ok, serverError } from "../../helpers";
import { Controller, HttpRequest, HttpResponse } from "../../protocols";

export class LoadCitiesController implements Controller<HttpRequest> {
  constructor(private readonly loadCities: LoadCities) {}
  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const cities = await this.loadCities.load();
      return ok(cities);
    } catch (error) {
      return serverError(error);
    }
  }
}
