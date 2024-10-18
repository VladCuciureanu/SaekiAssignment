import { Material } from "@prisma/client";

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

  static fromEntity(entity: Material): MaterialDto {
    return new MaterialDto({
      id: entity.id,
      name: entity.name,
      price: entity.price,
      archived: entity.archived,
    });
  }
}
