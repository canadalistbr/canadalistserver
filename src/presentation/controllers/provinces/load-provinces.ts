import { ProvinceModel } from "../../../domain/models";
import { SlugInsertion } from "../../protocols/slug-insertion";
import {
  Controller,
  HttpRequest,
  HttpResponse,
  LoadProvinces,
  ok,
  serverError,
} from "./protocols";

export class LoadProvincesController implements Controller<HttpRequest> {
  constructor(
    private readonly loadProvinces: LoadProvinces,
    private readonly addSlug: SlugInsertion<ProvinceModel>
  ) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const provinces = await this.loadProvinces.load();
      const provincesWithSlug = provinces.map((province) =>
        this.addSlug.add(province)
      );
      const data = ok(provincesWithSlug)
      return data;
    } catch (error) {
      return serverError(error);
    }
  }
}
