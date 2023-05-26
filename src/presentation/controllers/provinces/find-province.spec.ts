import { ProvinceModel } from '../../../domain/models'
import { CheckProvinceById } from '../../../domain/usecases/check-province-by-id'
import { FindProvince } from '../../../domain/usecases/find-province'
import { FindProvinceController, LoadProvinceController } from './find-province'
import { forbidden, ok, serverError } from './protocols'

const makeFakeProvinceFactory = (): ProvinceModel => {
  return {
    id: 1,
    capital: 'quebec city',
    flag_url: 'randomUrl',
    image_url: 'randomUrl',
    language: ['fr', 'en'],
    immigration_ranking: 4,
    name: 'Quebec',
    slug: 'Qc',
    top_cities: ['montreal']
  }
}
const mockRequest: LoadProvinceController.Request = {
  provinceId: 23
}
type SutType = {
  sut: FindProvinceController
  loadProvinceStub: FindProvince
  checkProvinceByIdStub: CheckProvinceById
}
const makeSut = (): SutType => {
  class LoadProvinceStub implements FindProvince {
    find(id: number): Promise<ProvinceModel> {
      return new Promise((resolve, reject) =>
        resolve(makeFakeProvinceFactory())
      )
    }
  }
  class CheckProvinceByIdStub implements CheckProvinceById {
    async check(id: number): Promise<boolean> {
      return new Promise((resolve) => resolve(true))
    }
  }
  const loadProvinceStub = new LoadProvinceStub()
  const checkProvinceByIdStub = new CheckProvinceByIdStub()
  const sut = new FindProvinceController(
    loadProvinceStub,
    checkProvinceByIdStub
  )
  return {
    sut,
    loadProvinceStub,
    checkProvinceByIdStub
  }
}

describe('LoadProvinceController', () => {
  it('checks if province exists', async () => {
    const { checkProvinceByIdStub, sut } = makeSut()
    const check = jest.spyOn(checkProvinceByIdStub, 'check')
    await sut.handle(mockRequest)
    expect(check).toHaveBeenCalled()
  })
  fit('return a 403 if province does not exist', async () => {
    const { checkProvinceByIdStub, sut } = makeSut()
    jest
      .spyOn(checkProvinceByIdStub, 'check')
      .mockReturnValueOnce(new Promise((resolve) => resolve(false)))
    const response = await sut.handle(mockRequest)
    expect(response).toEqual(forbidden('unauthorized'))
  })
  it('executes LoadProvince usecase', async () => {
    const { loadProvinceStub, sut } = makeSut()
    const load = jest.spyOn(loadProvinceStub, 'find')
    await sut.handle(mockRequest)
    expect(load).toHaveBeenCalled()
  })
  it('returns a 200 on success', async () => {
    const { sut } = makeSut()
    const response = await sut.handle(mockRequest)
    expect(response).toEqual(ok(makeFakeProvinceFactory()))
  })
  it('should return 500 if LoadProvinces throw', async () => {
    const { sut, loadProvinceStub } = makeSut()
    jest
      .spyOn(loadProvinceStub, 'find')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error('error')))
      )
    const httpResponse = await sut.handle(mockRequest)
    expect(httpResponse).toEqual(serverError(new Error('error')))
  })
})
