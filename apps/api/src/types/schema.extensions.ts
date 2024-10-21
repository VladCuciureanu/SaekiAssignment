/* eslint-disable @typescript-eslint/no-namespace */
import { Material, Prisma, ServicePackage, User } from "@prisma/client";
import { ComponentDto } from "@saeki/schema";
import { ComponentStatus } from "@saeki/schema";
import { MaterialDto } from "@saeki/schema";
import { OrderDto } from "@saeki/schema";
import { OrderStatus } from "@saeki/schema";
import { ProjectDto } from "@saeki/schema";
import { ServicePackageDto } from "@saeki/schema";
import { UserDto } from "@saeki/schema";

function componentDtofromEntity(
  entity: Prisma.ComponentGetPayload<{
    include: { material: true; servicePackage: true };
  }>,
): ComponentDto {
  return new ComponentDto({
    id: entity.id,
    assetUrl: entity.assetUrl,
    readOnly: entity.readOnly,
    quantity: entity.quantity,
    status: entity.status as ComponentStatus,
    material: MaterialDto.fromEntity(entity.material),
    servicePackage: ServicePackageDto.fromEntity(entity.servicePackage),
  });
}
ComponentDto.fromEntity = componentDtofromEntity;

function materialDtoFromEntity(entity: Material): MaterialDto {
  return new MaterialDto({
    id: entity.id,
    name: entity.name,
    price: entity.price,
    archived: entity.archived,
  });
}
MaterialDto.fromEntity = materialDtoFromEntity;

function orderDtoFromEntity(
  entity: Prisma.OrderGetPayload<{
    include: { project: true };
  }>,
): OrderDto {
  return new OrderDto({
    id: entity.id,
    status: entity.status as OrderStatus,
    clientId: entity.clientId,
    createdAt: entity.createdAt,
    project: ProjectDto.fromEntity({ ...entity.project, components: [] }),
  });
}
OrderDto.fromEntity = orderDtoFromEntity;

function projectDtoFromEntity(
  entity: Prisma.ProjectGetPayload<{
    include: {
      components: { include: { material: true; servicePackage: true } };
    };
  }>,
): ProjectDto {
  return new ProjectDto({
    id: entity.id,
    components: entity.components.map(ComponentDto.fromEntity),
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
  });
}
ServicePackageDto.fromEntity = servicePackageDtoFromEntity;

function userDtoFromEntity(entity: User): UserDto {
  return new UserDto({
    id: entity.id,
    email: entity.email,
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
  namespace UserDto {
    export function fromEntity(
      entity: Parameters<typeof userDtoFromEntity>[0],
    ): UserDto;
  }
}
