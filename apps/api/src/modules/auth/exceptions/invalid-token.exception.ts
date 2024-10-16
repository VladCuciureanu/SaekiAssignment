import { BaseException } from "../../common/exceptions/base.exception";

export class InvalidTokenException extends BaseException {
  constructor(message = "Invalid token.") {
    super(message, 403, "INVALID_TOKEN");
  }
}
