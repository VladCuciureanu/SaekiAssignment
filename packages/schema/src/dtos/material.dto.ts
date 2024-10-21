export class MaterialDto {
  id: string;
  name: string;
  price: number;
  archived: boolean;
  default: boolean;

  constructor(props: {
    id: string;
    name: string;
    price: number;
    archived: boolean;
    default: boolean;
  }) {
    this.id = props.id;
    this.name = props.name;
    this.price = props.price;
    this.archived = props.archived;
    this.default = props.default;
  }

  static fromJson(json: any): MaterialDto {
    return new MaterialDto({
      id: json.id,
      name: json.name,
      price: json.price,
      archived: json.archived,
      default: json.default,
    });
  }
}
