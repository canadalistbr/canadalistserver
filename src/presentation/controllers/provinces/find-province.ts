import { CheckProvinceById } from '../../../domain/usecases/check-province-by-id'
import { FindProvince } from '../../../domain/usecases/find-province'
import { Controller, forbidden, HttpResponse, ok, serverError } from './protocols'

export class FindProvinceController implements Controller {
  constructor(
    private readonly loadProvince: FindProvince,
    private readonly checkProvinceById: CheckProvinceById
  ) {}
  async handle(request: LoadProvinceController.Request): Promise<HttpResponse> {
    try{

    const { provinceId } = request
    const isProvince = this.checkProvinceById.check(provinceId)
    if (!isProvince) {
      return forbidden('province not found')
    }
    const province =  await this.loadProvince.load(provinceId)
    return ok(province)
  }catch(error){
    return serverError(error)
  }
}
}

export namespace LoadProvinceController {
  export type Request = {
    provinceId: number
  }
}
