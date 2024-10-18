import { MaterialDto } from "./material.dto";
import { ServicePackageDto } from "./service-package.dto";

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
}
