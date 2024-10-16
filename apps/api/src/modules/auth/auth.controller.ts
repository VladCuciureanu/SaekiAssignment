import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dtos/login.dto";
import { RegisterDto } from "./dtos/register.dto";

export class AuthController {
  db: PrismaClient;
  service: AuthService;

  constructor(props: { db: PrismaClient }) {
    this.db = props.db;
    this.service = new AuthService({ db: this.db });
  }

  public async login(req: Request, res: Response, next: NextFunction) {
    const dto = req.body as LoginDto;

    const token = await this.service.login({ dto });

    res.json({ token });
  }

  public async register(req: Request, res: Response, next: NextFunction) {
    const dto = req.body as RegisterDto;

    const token = await this.service.register({ dto });

    res.json({ token });
  }
}
