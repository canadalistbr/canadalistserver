import { ServerError } from "../errors/serverError";
import { HttpResponse } from "../protocols/http";

export function ok(body: any): HttpResponse {
  return {
    statusCode: 200,
    body,
  };
}
export function serverError(error: Error): HttpResponse {
  return {
    statusCode: 500,
    body: new ServerError(error.stack),
  };
}
