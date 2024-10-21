import { Prisma, ComponentStatus } from "@prisma/client";
import { MaterialDto } from "../../materials/dtos/material.dto";
import { ServicePackageDto } from "../../service-packages/dtos/service-package.dto";

export class ComponentDto {
  id: string;
  status: ComponentStatus;
  assetUrl: string;
  quantity: number;
  unitPrice?: number;
  material: MaterialDto;
  servicePackage: ServicePackageDto;

  constructor(props: {
    id: string;
    status: ComponentStatus;
    assetUrl: string;
    quantity: number;
    unitPrice?: number;
    material: MaterialDto;
    servicePackage: ServicePackageDto;
  }) {
    this.id = props.id;
    this.status = props.status;
    this.assetUrl = props.assetUrl;
    this.quantity = props.quantity;
    this.unitPrice = props.unitPrice;
    this.material = props.material;
    this.servicePackage = props.servicePackage;
  }

  static fromEntity(
    entity: Prisma.ComponentGetPayload<{
      include: { material: true; servicePackage: true };
    }>,
  ): ComponentDto {
    return new ComponentDto({
      id: entity.id,
      status: entity.status,
      assetUrl: entity.assetUrl,
      quantity: entity.quantity,
      unitPrice: entity.unitPrice ?? undefined,
      material: MaterialDto.fromEntity(entity.material),
      servicePackage: ServicePackageDto.fromEntity(entity.servicePackage),
    });
  }

  static fromJson(json: any): ComponentDto {
    return new ComponentDto({
      id: json.id,
      status: json.status,
      assetUrl: json.assetUrl,
      quantity: json.quantity,
      unitPrice: json.unitPrice,
      material: MaterialDto.fromJson(json.material),
      servicePackage: ServicePackageDto.fromJson(json.servicePackage),
    });
  }
}
