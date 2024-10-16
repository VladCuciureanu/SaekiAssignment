import { PrismaClient } from "@prisma/client";
import { UserDto } from "../users/dtos/user.dto";
import { LoginDto } from "./dtos/login.dto";
import { NotFoundException } from "../common/exceptions/not-found-exception";
import jwt from "jsonwebtoken";
import { env } from "../env";

export class AuthService {
  db: PrismaClient;

  constructor(props: { db: PrismaClient }) {
    this.db = props.db;
  }

  public async getToken(props: { dto: LoginDto }): Promise<string> {
    const user = await this.db.user.findUnique({
      where: { email: props.dto.email },
    });

    if (!user) {
      throw new NotFoundException();
    }

    const mappedUser = UserDto.fromEntity(user);

    const token = jwt.sign({ user: mappedUser }, env.JWT_SECRET_KEY);

    return token;
  }
}
