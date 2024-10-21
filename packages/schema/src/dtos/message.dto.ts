export class MessageDto {
  id: string;
  content: string;
  senderId: string;
  createdAt: Date;

  constructor(props: {
    id: string;
    content: string;
    senderId: string;
    createdAt: Date;
  }) {
    this.id = props.id;
    this.content = props.content;
    this.senderId = props.senderId;
    this.createdAt = props.createdAt;
  }
}
