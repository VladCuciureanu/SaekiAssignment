import { UserDto } from "@saeki/schema";

declare module "jsonwebtoken" {
  export interface JwtPayload {
    user: UserDto;
  }
}
