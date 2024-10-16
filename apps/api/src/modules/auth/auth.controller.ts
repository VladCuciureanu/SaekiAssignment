import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dtos/login.dto";

export class AuthController {
  db: PrismaClient;
  service: AuthService;

  constructor(props: { db: PrismaClient }) {
    this.db = props.db;
    this.service = new AuthService({ db: this.db });
  }

  public async getToken(req: Request, res: Response, next: NextFunction) {
    const dto = req.body as LoginDto;

    const token = await this.service.getToken({ dto });

    res.json({ token });
  }
}
