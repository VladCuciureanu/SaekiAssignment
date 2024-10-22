import {
  PrismaClient,
  SupportTicket,
  SupportTicketStatus,
} from "@prisma/client";
import { NotFoundException } from "../common/exceptions/not-found-exception";
import { CreateSupportTicketRequest } from "@saeki/schema";
import { UserDto } from "@saeki/schema";
import { SupportTicketDto } from "@saeki/schema";

export class SupportTicketsService {
  db: PrismaClient;

  constructor(props: { db: PrismaClient }) {
    this.db = props.db;
  }

  public async createSupportTicket(props: {
    dto: CreateSupportTicketRequest;
    user: UserDto;
  }): Promise<SupportTicketDto> {
    const entity = await this.db.supportTicket.create({
      data: {
        orderId: props.dto.orderId,
      },
    });

    const mappedEntity = SupportTicketDto.fromEntity(entity);
    return mappedEntity;
  }

  public async getManySupportTickets(props: {
    user: UserDto;
  }): Promise<SupportTicketDto[]> {
    const entities = await this.db.supportTicket.findMany({
      where: { order: { clientId: props.user.id } },
      include: {
        order: true,
      },
      orderBy: { createdAt: "desc" },
    });

    const mappedEntities = entities.map((it) => {
      return SupportTicketDto.fromEntity(it);
    });

    return mappedEntities;
  }

  public async getSupportTicket(props: {
    id: string;
    user: UserDto;
  }): Promise<SupportTicketDto> {
    const entity = await this.db.supportTicket.findFirst({
      where: { id: props.id, order: { clientId: props.user.id } },
      include: {
        order: true,
      },
    });

    if (!entity) {
      throw new NotFoundException();
    }

    const mappedEntity = SupportTicketDto.fromEntity(entity);

    return mappedEntity;
  }

  public async deleteSupportTicket(props: {
    id: string;
    user: UserDto;
  }): Promise<SupportTicketDto> {
    await this.assertEntityExists(props);

    const entity = await this.db.supportTicket.update({
      where: { id: props.id, order: { clientId: props.user.id } },
      data: { status: SupportTicketStatus.Closed },
      include: {
        order: true,
      },
    });

    const mappedEntity = SupportTicketDto.fromEntity(entity);

    return mappedEntity;
  }

  private async assertEntityExists(props: {
    id: string;
    user: UserDto;
  }): Promise<SupportTicket> {
    const entity = await this.db.supportTicket.findFirst({
      where: { id: props.id, order: { clientId: props.user.id } },
    });
    if (!entity) {
      throw new NotFoundException();
    }
    return entity;
  }
}
