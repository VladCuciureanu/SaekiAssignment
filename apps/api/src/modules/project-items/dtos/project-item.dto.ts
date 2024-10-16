import { Prisma } from "@prisma/client";
import { MaterialDto } from "../../materials/dtos/material.dto";
import { ServicePackageDto } from "../../service-packages/dtos/service-package.dto";

export class ProjectItemDto {
  id: string;
  assetUrl: string;
  quantity: number;
  unitPrice?: number;
  material: MaterialDto;
  servicePackage: ServicePackageDto;

  constructor(props: {
    id: string;
    assetUrl: string;
    quantity: number;
    unitPrice?: number;
    material: MaterialDto;
    servicePackage: ServicePackageDto;
  }) {
    this.id = props.id;
    this.assetUrl = props.assetUrl;
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
      assetUrl: entity.assetUrl,
      quantity: entity.quantity,
      unitPrice: entity.unitPrice ?? undefined,
      material: MaterialDto.fromEntity(entity.material),
      servicePackage: ServicePackageDto.fromEntity(entity.servicePackage),
    });
  }
}
