import { CityModel } from "../../../domain/models/cities";
import { LoadCities } from "../../../domain/usecases/load-cities";
import { ok, serverError } from "../../helpers";
import { Controller, HttpResponse } from "../../protocols";
import { SlugInsertion } from "../../protocols/slug-insertion";

export class LoadCitiesController implements Controller<LoadCitiesController.Request> {
  constructor(
    private readonly loadCities: LoadCities,
    private readonly addSlug: SlugInsertion<CityModel>
  ) { }
  async handle(request: LoadCitiesController.Request): Promise<HttpResponse> {
    try {
      const cities = await this.loadCities.load(request);
      const citiesWithSlug = cities.map((city) => this.addSlug.add(city));
      return ok(citiesWithSlug);
    } catch (error) {
      console.log(error)
      return serverError(error);
    }
  }
}

export namespace LoadCitiesController {
  export type Request = {
    bikeFriendly?: string
    nature?: string
    festivals?: string
    winter?: "Mild" | "Cold" | "Freezing"
    size?: "Small" | "Medium" | "Big"
    province?: string
    en?: string
    fr?: string
    costOverall?: "Low" | "Medium" | "High"
  }
}