import { BaseException } from "./base.exception";

export class InvalidPayloadException extends BaseException {
  issues: unknown[] = [];
  constructor(issues: unknown[]) {
    super(`Invalid payload.`, 400, "INVALID_PAYLOAD");
    this.issues = issues;
  }
}
