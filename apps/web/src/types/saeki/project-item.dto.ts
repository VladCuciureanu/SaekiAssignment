import { MaterialDto } from "./material.dto";
import { ServicePackageDto } from "./service-package.dto";

export enum ProjectItemStatus {
  Created = "Created",
  AutoQuoted = "AutoQuoted",
  ManuallyQuoted = "ManuallyQuoted",
  ReadOnly = "ReadOnly",
}

export class ProjectItemDto {
  id: string;
  status: ProjectItemStatus;
  assetUrl: string;
  quantity: number;
  unitPrice?: number;
  material: MaterialDto;
  servicePackage: ServicePackageDto;

  constructor(props: {
    id: string;
    status: ProjectItemStatus;
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

  static fromJson(json: any): ProjectItemDto {
    return new ProjectItemDto({
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
