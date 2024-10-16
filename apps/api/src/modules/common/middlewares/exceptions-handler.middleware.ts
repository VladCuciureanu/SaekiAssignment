import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { BaseException } from "../exceptions/base.exception";

export const exceptionsHandler: ErrorRequestHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof BaseException) {
    return res.status(err.status).json({ error: err.message });
  }

  return res.status(500).json({ error: err.message });
};
