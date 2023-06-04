import { CheckProvinceByName } from "../../../domain/usecases/check-province-by-id";
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
    private readonly checkProvinceByName: CheckProvinceByName
  ) {}
  async handle(request: LoadProvinceController.Request): Promise<HttpResponse> {
    try {
      const { provinceName } = request;
      const isProvince = await this.checkProvinceByName.check(provinceName);
      if (!isProvince) {
        return forbidden("unauthorized");
      }
      const province = await this.loadProvince.find(provinceName);
      return ok(province);
    } catch (error) {
      return serverError(error);
    }
  }
}

export namespace LoadProvinceController {
  export type Request = {
    provinceName: string;
  };
}
