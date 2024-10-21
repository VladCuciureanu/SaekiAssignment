import { OrderStatus } from "../enums/order-status.enum";

export class OrderDto {
  id: string;
  status: OrderStatus;
  clientId: string;
  createdAt: Date;

  constructor(props: {
    id: string;
    status: OrderStatus;
    clientId: string;
    createdAt: Date;
  }) {
    this.id = props.id;
    this.status = props.status;
    this.clientId = props.clientId;
    this.createdAt = props.createdAt;
  }
}
