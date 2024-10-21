export class UserDto {
  id: string;
  email: string;
  isAdmin: boolean;

  constructor(props: { id: string; email: string; isAdmin: boolean }) {
    this.id = props.id;
    this.email = props.email;
    this.isAdmin = props.isAdmin;
  }
}
