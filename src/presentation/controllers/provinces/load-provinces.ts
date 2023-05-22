import { LoadProvinces } from "../../../domain/usecases";
import { ok, serverError } from "../../helpers";
import { Controller, HttpRequest, HttpResponse } from "../../protocols";

export class LoadProvincesController implements Controller {
  constructor(private readonly loadProvinces: LoadProvinces) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const provinces = await this.loadProvinces.load();
      const data = ok(provinces);
      return data;
    } catch (error) {
      return serverError(error);
    }
  }
}
