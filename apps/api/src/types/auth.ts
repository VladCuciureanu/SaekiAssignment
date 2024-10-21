import { UserDto } from "../modules/users/dtos/user.dto";

declare module "jsonwebtoken" {
  export interface JwtPayload {
    user: UserDto;
  }
}
