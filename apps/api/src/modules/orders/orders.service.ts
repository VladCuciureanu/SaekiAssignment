import { Order, OrderStatus, PrismaClient } from "@prisma/client";
import { NotFoundException } from "../common/exceptions/not-found-exception";
import { ForbiddenException } from "../common/exceptions/forbidden.exception";
import { CreateOrderRequest } from "@saeki/schema";
import { UserDto } from "@saeki/schema";
import { OrderDto } from "@saeki/schema";
import { UpdateOrderRequest } from "@saeki/schema";

export class OrdersService {
  db: PrismaClient;

  constructor(props: { db: PrismaClient }) {
    this.db = props.db;
  }

  public async createOrder(props: {
    dto: CreateOrderRequest;
    user: UserDto;
  }): Promise<OrderDto> {
    const project = await this.db.project.findFirst({
      where: { id: props.dto.projectId, clientId: props.user.id },
      include: { components: true },
    });

    if (!project) {
      throw new NotFoundException();
    }

    const entity = await this.db.order.create({
      data: {
        clientId: props.user.id,
        components: {
          createMany: {
            data: project.components.map((it) => ({
              status: it.status,
              assetUrl: it.assetUrl,
              quantity: it.quantity,
              unitPrice: it.unitPrice,
              readOnly: true,
              materialId: it.materialId,
              servicePackageId: it.servicePackageId,
              createdAt: it.createdAt,
            })),
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
    });

    if (!entity) {
      throw new NotFoundException();
    }

    const mappedEntity = OrderDto.fromEntity(entity);

    return mappedEntity;
  }

  public async updateOrder(props: {
    id: string;
    dto: UpdateOrderRequest;
    user: UserDto;
  }): Promise<OrderDto> {
    await this.assertEntityExists(props);

    // TODO: Check if status update is allowed

    const entity = await this.db.order.update({
      where: { id: props.id, clientId: props.user.id },
      data: { status: props.dto.status },
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
