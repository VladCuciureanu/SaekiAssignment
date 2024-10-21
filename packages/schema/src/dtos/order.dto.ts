import { ProjectDto } from "./project.dto";
import { OrderStatus } from "../enums/order-status.enum";

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
