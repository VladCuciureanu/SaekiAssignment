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

type ComponentToDtoProps = Prisma.ComponentGetPayload<{
  include: { material: true; servicePackage: true };
}>;
ComponentDto.fromEntity = (entity: ComponentToDtoProps): ComponentDto => {
  return new ComponentDto({
    id: entity.id,
    assetUrl: entity.assetUrl,
    readOnly: entity.readOnly,
    quantity: entity.quantity,
    status: entity.status as ComponentStatus,
    material: MaterialDto.fromEntity(entity.material),
    servicePackage: ServicePackageDto.fromEntity(entity.servicePackage),
  });
};

type MaterialToDtoProps = Material;
MaterialDto.fromEntity = (entity: MaterialToDtoProps): MaterialDto => {
  return new MaterialDto({
    id: entity.id,
    name: entity.name,
    price: entity.price,
    archived: entity.archived,
  });
};

type OrderToDtoProps = Prisma.OrderGetPayload<{
  include: { project: true };
}>;
OrderDto.fromEntity = (entity: OrderToDtoProps): OrderDto => {
  return new OrderDto({
    id: entity.id,
    status: entity.status as OrderStatus,
    clientId: entity.clientId,
    createdAt: entity.createdAt,
    project: ProjectDto.fromEntity({ ...entity.project, components: [] }),
  });
};

type ProjectToDtoProps = Prisma.ProjectGetPayload<{
  include: {
    components: { include: { material: true; servicePackage: true } };
  };
}>;
ProjectDto.fromEntity = (entity: ProjectToDtoProps): ProjectDto => {
  return new ProjectDto({
    id: entity.id,
    components: entity.components.map(ComponentDto.fromEntity),
    createdAt: entity.createdAt,
  });
};

type ServicePackageToDtoProps = ServicePackage;
ServicePackageDto.fromEntity = (
  entity: ServicePackageToDtoProps,
): ServicePackageDto => {
  return new ServicePackageDto({
    id: entity.id,
    name: entity.name,
    price: entity.price,
    archived: entity.archived,
  });
};

type UserToDtoProps = User;
UserDto.fromEntity = (entity: UserToDtoProps): UserDto => {
  return new UserDto({
    id: entity.id,
    email: entity.email,
  });
};

declare module "@saeki/schema" {
  namespace ComponentDto {
    export function fromEntity(entity: ComponentToDtoProps): ComponentDto;
  }
  namespace MaterialDto {
    export function fromEntity(entity: MaterialToDtoProps): MaterialDto;
  }
  namespace OrderDto {
    export function fromEntity(entity: OrderToDtoProps): OrderDto;
  }
  namespace ProjectDto {
    export function fromEntity(entity: ProjectToDtoProps): ProjectDto;
  }
  namespace ServicePackageDto {
    export function fromEntity(
      entity: ServicePackageToDtoProps,
    ): ServicePackageDto;
  }
  namespace UserDto {
    export function fromEntity(entity: UserToDtoProps): UserDto;
  }
}
