import { ProvinceModel } from "../../../domain/models";
import { CheckProvinceByName } from "../../../domain/usecases/check-province-by-name";
import { FindProvince } from "../../../domain/usecases/find-province";
import { EntityNameSanitization } from "../../../utils/add-slug/sanitize-entity-name";
import { SlugInsertion } from "../../protocols/slug-insertion";
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
    private readonly checkProvinceById: CheckProvinceByName,
    private readonly slugInsertion: SlugInsertion<ProvinceModel>,
    private readonly nameSanitization: EntityNameSanitization
    ) {}
  async handle(request: LoadProvinceController.Request): Promise<HttpResponse> {
    try {
      const { provinceName } = request;
      const sanitizedName = this.nameSanitization.sanitize(provinceName)
      const isProvince = await this.checkProvinceById.check(sanitizedName);
      if (!isProvince) {
        return forbidden("unauthorized");
      }
      const province = await this.loadProvince.find(sanitizedName);
      const provinceWithSlug = this.slugInsertion.add(province)
      return ok(provinceWithSlug);
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
