/* eslint-disable @typescript-eslint/no-namespace */
import {
  Component,
  Material,
  Order,
  Project,
  ServicePackage,
  SupportTicket,
  User,
} from "@prisma/client";
import { ComponentDto } from "@saeki/schema";
import { ComponentStatus } from "@saeki/schema";
import { MaterialDto } from "@saeki/schema";
import { OrderDto } from "@saeki/schema";
import { OrderStatus } from "@saeki/schema";
import { ProjectDto } from "@saeki/schema";
import { ServicePackageDto } from "@saeki/schema";
import { UserDto } from "@saeki/schema";
import { SupportTicketDto } from "@saeki/schema";
import { SupportTicketStatus } from "@saeki/schema";

function componentDtofromEntity(entity: Component): ComponentDto {
  return new ComponentDto({
    id: entity.id,
    status: entity.status as ComponentStatus,
    readOnly: entity.readOnly,
    assetUrl: entity.assetUrl,
    quantity: entity.quantity,
    unitPrice: entity.unitPrice ?? undefined,
    materialId: entity.materialId,
    servicePackageId: entity.servicePackageId,
    createdAt: entity.createdAt,
  });
}
ComponentDto.fromEntity = componentDtofromEntity;

function materialDtoFromEntity(entity: Material): MaterialDto {
  return new MaterialDto({
    id: entity.id,
    name: entity.name,
    price: entity.price,
    archived: entity.archived,
    default: entity.default,
  });
}
MaterialDto.fromEntity = materialDtoFromEntity;

function orderDtoFromEntity(entity: Order): OrderDto {
  return new OrderDto({
    id: entity.id,
    status: entity.status as OrderStatus,
    clientId: entity.clientId,
    createdAt: entity.createdAt,
  });
}
OrderDto.fromEntity = orderDtoFromEntity;

function projectDtoFromEntity(entity: Project): ProjectDto {
  return new ProjectDto({
    id: entity.id,
    clientId: entity.clientId,
    createdAt: entity.createdAt,
  });
}
ProjectDto.fromEntity = projectDtoFromEntity;

function servicePackageDtoFromEntity(
  entity: ServicePackage,
): ServicePackageDto {
  return new ServicePackageDto({
    id: entity.id,
    name: entity.name,
    price: entity.price,
    archived: entity.archived,
    default: entity.default,
  });
}
ServicePackageDto.fromEntity = servicePackageDtoFromEntity;

function supportTicketDtoFromEntity(entity: SupportTicket): SupportTicketDto {
  return new SupportTicketDto({
    id: entity.id,
    status: entity.status as SupportTicketStatus,
    orderId: entity.orderId,
    createdAt: entity.createdAt,
  });
}
SupportTicketDto.fromEntity = supportTicketDtoFromEntity;

function userDtoFromEntity(entity: User): UserDto {
  return new UserDto({
    id: entity.id,
    email: entity.email,
    isAdmin: entity.isAdmin,
  });
}
UserDto.fromEntity = userDtoFromEntity;

declare module "@saeki/schema" {
  namespace ComponentDto {
    export function fromEntity(
      entity: Parameters<typeof componentDtofromEntity>[0],
    ): ComponentDto;
  }
  namespace MaterialDto {
    export function fromEntity(
      entity: Parameters<typeof materialDtoFromEntity>[0],
    ): MaterialDto;
  }
  namespace OrderDto {
    export function fromEntity(
      entity: Parameters<typeof orderDtoFromEntity>[0],
    ): OrderDto;
  }
  namespace ProjectDto {
    export function fromEntity(
      entity: Parameters<typeof projectDtoFromEntity>[0],
    ): ProjectDto;
  }
  namespace ServicePackageDto {
    export function fromEntity(
      entity: Parameters<typeof servicePackageDtoFromEntity>[0],
    ): ServicePackageDto;
  }
  namespace SupportTicketDto {
    export function fromEntity(
      entity: Parameters<typeof supportTicketDtoFromEntity>[0],
    ): SupportTicketDto;
  }
  namespace UserDto {
    export function fromEntity(
      entity: Parameters<typeof userDtoFromEntity>[0],
    ): UserDto;
  }
}