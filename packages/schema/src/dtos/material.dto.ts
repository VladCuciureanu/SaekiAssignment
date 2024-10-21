export class MaterialDto {
  id: string;
  name: string;
  price: number;
  archived: boolean;

  constructor(props: {
    id: string;
    name: string;
    price: number;
    archived: boolean;
  }) {
    this.id = props.id;
    this.name = props.name;
    this.price = props.price;
    this.archived = props.archived;
  }

  static fromJson(json: any): MaterialDto {
    return new MaterialDto({
      id: json.id,
      name: json.name,
      price: json.price,
      archived: json.archived,
    });
  }
}
