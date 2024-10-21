import jwt, {
  JsonWebTokenError,
  JwtPayload,
  TokenExpiredError,
} from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { env } from "../../env";
import { InvalidTokenException } from "../exceptions/invalid-token.exception";
import { TokenExpiredException } from "../exceptions/token-expired.exception";
import { UnauthorizedException } from "../exceptions/unauthorized.exception";

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const cookiesToken = req.cookies.token;
    const headersToken = req.headers.authorization?.split(" ").at(1);

    const token = cookiesToken || headersToken;

    if (!token) {
      throw new UnauthorizedException();
    }

    // const cookies = parseCookies(req.headers.cookie!);
    // const token = cookies['token'];

    const payload: JwtPayload = jwt.verify(
      token,
      env.JWT_SECRET_KEY,
    ) as JwtPayload;

    res.locals.user = payload.user;

    next();
  } catch (error: unknown) {
    if (error instanceof TokenExpiredError) {
      next(new TokenExpiredException(error.message));
    }

    if (error instanceof JsonWebTokenError) {
      next(new InvalidTokenException(error.message));
    }

    next(error);
  }
};
