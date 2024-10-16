import { User } from "@prisma/client";

export class UserDto {
  id: string;
  email: string;

  constructor(props: { id: string; email: string }) {
    this.id = props.id;
    this.email = props.email;
  }

  static fromEntity(entity: User): UserDto {
    return new UserDto({
      id: entity.id,
      email: entity.email,
    });
  }
}
