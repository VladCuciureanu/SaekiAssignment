export class ServicePackageDto {
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

  static fromJson(json: any): ServicePackageDto {
    return new ServicePackageDto({
      id: json.id,
      name: json.name,
      price: json.price,
      archived: json.archived,
    });
  }
}
