import { Prisma, ProjectItem } from "@prisma/client";
import { MaterialDto } from "../../materials/dtos/material.dto";
import { ServicePackageDto } from "../../service-packages/dtos/service-package.dto";

export class ProjectItemDto {
  id: string;
  quantity: number;
  unitPrice?: number;
  material: MaterialDto;
  servicePackage: ServicePackageDto;

  constructor(props: {
    id: string;
    quantity: number;
    unitPrice?: number;
    material: MaterialDto;
    servicePackage: ServicePackageDto;
  }) {
    this.id = props.id;
    this.quantity = props.quantity;
    this.unitPrice = props.unitPrice;
    this.material = props.material;
    this.servicePackage = props.servicePackage;
  }

  static fromEntity(
    entity: Prisma.ProjectItemGetPayload<{
      include: { material: true; servicePackage: true };
    }>,
  ): ProjectItemDto {
    return new ProjectItemDto({
      id: entity.id,
      quantity: entity.quantity,
      unitPrice: entity.unitPrice ?? undefined,
      material: MaterialDto.fromEntity(entity.material),
      servicePackage: ServicePackageDto.fromEntity(entity.servicePackage),
    });
  }
}
