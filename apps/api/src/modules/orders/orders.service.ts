import {
  Order,
  OrderStatus,
  PrismaClient,
  ProjectStatus,
} from "@prisma/client";
import { CreateOrderDto } from "./dtos/create-order.dto";
import { UserDto } from "../users/dtos/user.dto";
import { OrderDto } from "./dtos/order.dto";
import { UpdateOrderDto } from "./dtos/update-order.dto";
import { NotFoundException } from "../common/exceptions/not-found-exception";
import { ForbiddenException } from "../common/exceptions/forbidden.exception";

export class OrdersService {
  db: PrismaClient;

  constructor(props: { db: PrismaClient }) {
    this.db = props.db;
  }

  public async createOrder(props: {
    dto: CreateOrderDto;
    user: UserDto;
  }): Promise<OrderDto> {
    const project = await this.db.project.findFirst({
      where: { id: props.dto.projectId, clientId: props.user.id },
    });

    if (!project) {
      throw new NotFoundException();
    }

    await this.db.project.update({
      where: { id: props.dto.projectId, clientId: props.user.id },
      data: { status: ProjectStatus.ReadOnly },
    });

    const entity = await this.db.order.create({
      data: {
        projectId: props.dto.projectId,
        clientId: props.user.id,
      },
      include: {
        project: {
          include: {
            items: { include: { material: true, servicePackage: true } },
          },
        },
      },
    });

    const mappedEntity = OrderDto.fromEntity(entity);

    return mappedEntity;
  }

  public async getManyOrders(props: { user: UserDto }): Promise<OrderDto[]> {
    const entities = await this.db.order.findMany({
      where: { clientId: props.user.id },
      orderBy: { createdAt: "desc" },
      include: {
        project: {
          include: {
            items: { include: { material: true, servicePackage: true } },
          },
        },
      },
    });

    const mappedEntities = entities.map((it) => {
      return OrderDto.fromEntity(it);
    });

    return mappedEntities;
  }

  public async getOrder(props: {
    id: string;
    user: UserDto;
  }): Promise<OrderDto> {
    const entity = await this.db.order.findFirst({
      where: { id: props.id, clientId: props.user.id },
      include: {
        project: {
          include: {
            items: { include: { material: true, servicePackage: true } },
          },
        },
      },
    });

    if (!entity) {
      throw new NotFoundException();
    }

    const mappedEntity = OrderDto.fromEntity(entity);

    return mappedEntity;
  }

  public async updateOrder(props: {
    id: string;
    dto: UpdateOrderDto;
    user: UserDto;
  }): Promise<OrderDto> {
    await this.assertEntityExists(props);

    // TODO: Check if status update is allowed

    const entity = await this.db.order.update({
      where: { id: props.id, clientId: props.user.id },
      data: { status: props.dto.status },
      include: {
        project: {
          include: {
            items: { include: { material: true, servicePackage: true } },
          },
        },
      },
    });

    const mappedEntity = OrderDto.fromEntity(entity);

    return mappedEntity;
  }

  public async deleteOrder(props: {
    id: string;
    user: UserDto;
  }): Promise<OrderDto> {
    const originalEntity = await this.assertEntityExists(props);

    const canCancel = originalEntity.status === OrderStatus.PaymentDue;
    if (!canCancel) {
      throw new ForbiddenException();
    }

    const entity = await this.db.order.update({
      where: { id: props.id, clientId: props.user.id },
      data: { status: OrderStatus.Cancelled },
      include: {
        project: {
          include: {
            items: { include: { material: true, servicePackage: true } },
          },
        },
      },
    });

    const mappedEntity = OrderDto.fromEntity(entity);

    return mappedEntity;
  }

  private async assertEntityExists(props: {
    id: string;
    user: UserDto;
  }): Promise<Order> {
    const entity = await this.db.order.findFirst({
      where: { id: props.id, clientId: props.user.id },
    });
    if (!entity) {
      throw new NotFoundException();
    }
    return entity;
  }
}
