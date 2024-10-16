import { BaseException } from "../../common/exceptions/base.exception";

export class EmailTakenException extends BaseException {
  constructor(message = "Email already in use.") {
    super(message, 409, "EMAIL_TAKEN");
  }
}
