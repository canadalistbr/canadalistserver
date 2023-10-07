import { CheckProvinceByName } from "../../../domain/usecases/check-province-by-name";
import { FindProvince } from "../../../domain/usecases/find-province";
import {
  Controller,
  forbidden,
  HttpResponse,
  ok,
  serverError,
} from "./protocols";

export class FindProvinceController implements Controller {
  constructor(
    private readonly loadProvince: FindProvince,
    private readonly checkProvinceById: CheckProvinceByName
  ) {}
  async handle(request: LoadProvinceController.Request): Promise<HttpResponse> {
    try {
      const { provinceId } = request;
      const isProvince = await this.checkProvinceById.check(provinceId);
      if (!isProvince) {
        return forbidden("unauthorized");
      }
      const province = await this.loadProvince.find(provinceId);
      return ok(province);
    } catch (error) {
      return serverError(error);
    }
  }
}

export namespace LoadProvinceController {
  export type Request = {
    provinceId: string;
  };
}
