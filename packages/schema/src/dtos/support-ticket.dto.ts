import { SupportTicketStatus } from "../enums/support-ticket-status.enum";

export class SupportTicketDto {
  id: string;
  status: SupportTicketStatus;
  orderId: string;
  createdAt: Date;

  constructor(props: {
    id: string;
    status: SupportTicketStatus;
    orderId: string;
    createdAt: Date;
  }) {
    this.id = props.id;
    this.status = props.status;
    this.orderId = props.orderId;
    this.createdAt = props.createdAt;
  }
}
