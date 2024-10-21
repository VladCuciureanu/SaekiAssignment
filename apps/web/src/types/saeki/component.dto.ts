import { MaterialDto } from "./material.dto";
import { ServicePackageDto } from "./service-package.dto";

export enum ComponentStatus {
  Created = "Created",
  AutoQuoted = "AutoQuoted",
  ManuallyQuoted = "ManuallyQuoted",
}

export class ComponentDto {
  id: string;
  status: ComponentStatus;
  readOnly: boolean;
  assetUrl: string;
  quantity: number;
  unitPrice?: number;
  material: MaterialDto;
  servicePackage: ServicePackageDto;

  constructor(props: {
    id: string;
    status: ComponentStatus;
    readOnly: boolean;
    assetUrl: string;
    quantity: number;
    unitPrice?: number;
    material: MaterialDto;
    servicePackage: ServicePackageDto;
  }) {
    this.id = props.id;
    this.status = props.status;
    this.readOnly = props.readOnly;
    this.assetUrl = props.assetUrl;
    this.quantity = props.quantity;
    this.unitPrice = props.unitPrice;
    this.material = props.material;
    this.servicePackage = props.servicePackage;
  }

  static fromJson(json: any): ComponentDto {
    return new ComponentDto({
      id: json.id,
      status: json.status,
      readOnly: json.readOnly,
      assetUrl: json.assetUrl,
      quantity: json.quantity,
      unitPrice: json.unitPrice,
      material: MaterialDto.fromJson(json.material),
      servicePackage: ServicePackageDto.fromJson(json.servicePackage),
    });
  }
}
