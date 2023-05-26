import { FindProvincePrismaRepository } from './find-province-repository'

describe('FindProvincePrismaRepository', () => {
  it('the returned value is truthy', async () => {
    const sut = new FindProvincePrismaRepository()
    const response = await sut.findProvinceById(1)
    expect(response).toBeTruthy()
  })
})
