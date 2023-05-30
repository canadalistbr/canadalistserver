import { Request, Response } from "express";
import { Controller } from "../../presentation/protocols";

export function routeAdapter(controller: Controller) {
  return async (req: Request, res: Response) => {
    const request = {
      ...req.body,
      ...req.params,
    };
    const { statusCode, body } = await controller.handle(request);
    return res.status(statusCode).json(body);
  };
}
