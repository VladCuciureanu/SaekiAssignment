import { ComponentStatus } from "../enums/component-status.enum";

export class ComponentDto {
  id: string;
  status: ComponentStatus;
  assetUrl: string;
  quantity: number;
  unitPrice?: number;
  readOnly: boolean;

  materialId: string;
  orderId?: string;
  projectId?: string;
  servicePackageId: string;
  createdAt: Date;

  constructor(props: {
    id: string;
    status: ComponentStatus;
    readOnly: boolean;
    assetUrl: string;
    quantity: number;
    unitPrice?: number;
    materialId: string;
    servicePackageId: string;
    createdAt: Date;
  }) {
    this.id = props.id;
    this.status = props.status;
    this.readOnly = props.readOnly;
    this.assetUrl = props.assetUrl;
    this.quantity = props.quantity;
    this.unitPrice = props.unitPrice;
    this.materialId = props.materialId;
    this.servicePackageId = props.servicePackageId;
    this.createdAt = props.createdAt;
  }

  static fromJson(json: any): ComponentDto {
    return new ComponentDto({
      id: json.id,
      status: json.status,
      readOnly: json.readOnly,
      assetUrl: json.assetUrl,
      quantity: json.quantity,
      unitPrice: json.unitPrice,
      materialId: json.materialId,
      servicePackageId: json.servicePackageId,
      createdAt: json.createdAt,
    });
  }
}
