import { CityModel } from "../../../domain/models/cities";
import { LoadCities } from "../../../domain/usecases/load-cities";
import { ok, serverError } from "../../helpers";
import { Controller, HttpRequest, HttpResponse } from "../../protocols";
import { SlugInsertion } from "../../protocols/slug-insertion";

export class LoadCitiesController implements Controller<HttpRequest> {
  constructor(
    private readonly loadCities: LoadCities,
    private readonly addSlug: SlugInsertion<CityModel>
  ) {}
  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const cities = await this.loadCities.load();
      const citiesWithSlug = cities.map((city) => this.addSlug.add(city));
      return ok(citiesWithSlug);
    } catch (error) {
      return serverError(error);
    }
  }
}
