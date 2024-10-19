import { ProjectDto } from "./project.dto";

export enum OrderStatus {
  PaymentDue = "PaymentDue",
  Processing = "Processing",
  Cancelled = "Cancelled",
  Problem = "Problem",
  InTransit = "InTransit",
  PickupAvailable = "PickupAvailable",
  Delivered = "Delivered",
  Returned = "Returned",
}

export class OrderDto {
  id: string;
  status: OrderStatus;
  clientId: string;
  project: ProjectDto;
  createdAt: Date;

  constructor(props: {
    id: string;
    status: OrderStatus;
    clientId: string;
    project: ProjectDto;
    createdAt: Date;
  }) {
    this.id = props.id;
    this.status = props.status;
    this.project = props.project;
    this.clientId = props.clientId;
    this.createdAt = props.createdAt;
  }
}
