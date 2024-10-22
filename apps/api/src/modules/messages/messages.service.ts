import { PrismaClient } from "@prisma/client";
import { NotFoundException } from "../common/exceptions/not-found-exception";
import { CreateMessageRequest } from "@saeki/schema";
import { UserDto } from "@saeki/schema";
import { MessageDto } from "@saeki/schema";

export class MessagesService {
  db: PrismaClient;

  constructor(props: { db: PrismaClient }) {
    this.db = props.db;
  }

  public async createMessage(props: {
    dto: CreateMessageRequest;
    user: UserDto;
  }): Promise<MessageDto> {
    const supportTicket = await this.db.supportTicket.findFirst({
      where: {
        id: props.dto.supportTicketId,
        order: { clientId: props.user.id },
      },
      include: { order: true },
    });

    if (!supportTicket) {
      throw new NotFoundException();
    }

    const entity = await this.db.message.create({
      data: {
        content: props.dto.content,
        senderId: props.user.id,
        supportTicketId: props.dto.supportTicketId,
      },
    });

    const mappedEntity = MessageDto.fromEntity(entity);

    return mappedEntity;
  }

  public async getMessagesBySupportTicketId(props: {
    id: string;
    user: UserDto;
  }): Promise<MessageDto[]> {
    const supportTicket = await this.db.supportTicket.findFirst({
      where: { id: props.id, order: { clientId: props.user.id } },
      include: { order: true },
    });

    if (!supportTicket) {
      throw new NotFoundException();
    }

    const entities = await this.db.message.findMany({
      where: { supportTicketId: props.id },
      orderBy: { createdAt: "asc" },
    });

    const mappedEntities = entities.map((it) => {
      return MessageDto.fromEntity(it);
    });

    return mappedEntities;
  }
}
