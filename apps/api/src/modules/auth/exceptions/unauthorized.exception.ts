import { BaseException } from "../../common/exceptions/base.exception";

export class UnauthorizedException extends BaseException {
  constructor(message = "Unauthorized.") {
    super(message, 401, "UNAUTHORIZED");
  }
}
