import { BaseException } from "./base.exception";

export class RouteNotFoundException extends BaseException {
  constructor(path: string, method: string) {
    super(`Route ${method} ${path} doesn't exist.`, 404, "ROUTE_NOT_FOUND");
  }
}
