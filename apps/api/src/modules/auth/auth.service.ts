import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { env } from "../env";
import argon2 from "argon2";
import { InvalidCredentialsException } from "./exceptions/invalid-credentials.exception";
import { EmailTakenException } from "./exceptions/email-taken.exception";
import { UserDto } from "@saeki/schema";
import { RegisterRequest } from "@saeki/schema";
import { LoginRequest } from "@saeki/schema";

export class AuthService {
  db: PrismaClient;

  constructor(props: { db: PrismaClient }) {
    this.db = props.db;
  }

  public async login(props: {
    dto: LoginRequest;
  }): Promise<{ user: UserDto; token: string }> {
    const user = await this.db.user.findUnique({
      where: { email: props.dto.email },
    });

    if (user && (await argon2.verify(user.passwordHash, props.dto.password))) {
      const mappedUser = UserDto.fromEntity(user);

      return {
        user: mappedUser,
        token: jwt.sign(
          {
            user: mappedUser,
          },
          env.JWT_SECRET_KEY,
        ),
      };
    }

    throw new InvalidCredentialsException();
  }

  public async register(props: {
    dto: RegisterRequest;
  }): Promise<{ user: UserDto; token: string }> {
    const userExists = await this.db.user
      .findUnique({
        where: { email: props.dto.email },
      })
      .then((res) => res !== null);

    if (userExists) {
      throw new EmailTakenException();
    }

    const user = await this.db.user.create({
      data: {
        email: props.dto.email,
        passwordHash: await argon2.hash(props.dto.password),
      },
    });

    const mappedUser = UserDto.fromEntity(user);

    return {
      user: mappedUser,
      token: jwt.sign(
        {
          user: mappedUser,
        },
        env.JWT_SECRET_KEY,
      ),
    };
  }
}
