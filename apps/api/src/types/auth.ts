import { UserDto } from "../modules/users/dtos/user.dto";
import jwt from "jsonwebtoken";

declare module "jsonwebtoken" {
  export interface JwtPayload {
    user: UserDto;
  }
}
