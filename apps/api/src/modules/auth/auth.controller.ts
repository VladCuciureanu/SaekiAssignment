import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { AuthService } from "./auth.service";
import { LoginRequest, RegisterRequest } from "@saeki/schema";

export class AuthController {
  db: PrismaClient;
  service: AuthService;

  constructor(props: { db: PrismaClient }) {
    this.db = props.db;
    this.service = new AuthService({ db: this.db });
  }

  public async login(req: Request, res: Response, _next: NextFunction) {
    const dto = req.body as LoginRequest;

    const { token, user } = await this.service.login({ dto });

    res.cookie("token", token);
    res.cookie("current_user", JSON.stringify(user));

    res.json({ token });
  }

  public async register(req: Request, res: Response, _next: NextFunction) {
    const dto = req.body as RegisterRequest;

    const { token, user } = await this.service.register({ dto });

    res.cookie("token", token);
    res.cookie("current_user", JSON.stringify(user));

    res.json({ token });
  }
}
