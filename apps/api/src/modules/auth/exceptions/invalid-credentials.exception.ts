import { BaseException } from "../../common/exceptions/base.exception";

export class InvalidCredentialsException extends BaseException {
  constructor(message = "Invalid user credentials.") {
    super(message, 401, "INVALID_CREDENTIALS");
  }
}
