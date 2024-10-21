import { OrderStatus, Prisma } from "@prisma/client";
import { ProjectDto } from "../../projects/dtos/project.dto";

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

  static fromEntity(
    entity: Prisma.OrderGetPayload<{
      include: {
        project: {
          include: {
            components: { include: { material: true; servicePackage: true } };
          };
        };
      };
    }>,
  ): OrderDto {
    return new OrderDto({
      id: entity.id,
      status: entity.status,
      project: ProjectDto.fromEntity(entity.project),
      clientId: entity.clientId,
      createdAt: entity.createdAt,
    });
  }
}
