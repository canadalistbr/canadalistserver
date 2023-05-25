import { Request, Response } from 'express'
import { Controller } from '../../presentation/protocols'

export function routeAdapter(controller: Controller) {
  return async (req: Request, res: Response) => {
    const { statusCode, body } = await controller.handle(req)
    return res.status(statusCode).json(body)
  }
}