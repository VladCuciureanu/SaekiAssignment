import { ServicePackage } from "@prisma/client";

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

  static fromEntity(entity: ServicePackage): ServicePackageDto {
    return new ServicePackageDto({
      id: entity.id,
      name: entity.name,
      price: entity.price,
      archived: entity.archived,
    });
  }
}
