import { LoadProvinces } from "../../../domain/models/usecases/load-provinces";
import { Controller } from "../../protocols/Controller";
import { HttpRequest, HttpResponse } from "../../protocols/http";

export class LoadProvincesController implements Controller {
  constructor(private loadProvinces: LoadProvinces) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const provinces = await this.loadProvinces.load();
      return {
        statusCode: 200,
        body: provinces,
      };
    } catch (err) {
      return {
        statusCode: 500,
        body: new Error(),
      };
    }
  }
}
