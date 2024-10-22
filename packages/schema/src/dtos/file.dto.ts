export class FileDto {
  id: string;
  name: string;

  constructor(props: { id: string; name: string }) {
    this.id = props.id;
    this.name = props.name;
  }

  static fromJson(json: any): FileDto {
    return new FileDto({
      id: json.id,
      name: json.name,
    });
  }
}
