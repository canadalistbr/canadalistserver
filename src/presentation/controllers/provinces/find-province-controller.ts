import { CheckProvinceByName } from "../../../domain/usecases/check-province-by-name";
import { FindProvince } from "../../../domain/usecases/find-province";
import { SanitizeEntityName } from "../../protocols/sanitize-entity-name";
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
    private readonly checkProvinceByName: CheckProvinceByName,
    private readonly sanitizeEntityname: SanitizeEntityName
  ) {}
  async handle(request: LoadProvinceController.Request): Promise<HttpResponse> {
    try {
      const { provinceName } = request;
      const name = this.sanitizeEntityname.sanitize(provinceName);
      const isProvince = await this.checkProvinceByName.check(name);
      if (!isProvince) {
        return forbidden("unauthorized");
      }
      const province = await this.loadProvince.find(name);
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
