import { BaseException } from "./base.exception";

export class ForbiddenException extends BaseException {
  constructor() {
    super(`You don't have permission to access this.`, 403, "FORBIDDEN");
  }
}
