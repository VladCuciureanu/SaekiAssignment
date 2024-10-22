import { Prisma, PrismaClient } from "@prisma/client";
import { NotFoundException } from "../common/exceptions/not-found-exception";
import { UnauthorizedException } from "../auth/exceptions/unauthorized.exception";
import { ForbiddenException } from "../common/exceptions/forbidden.exception";
import { CreateComponentRequest } from "@saeki/schema";
import { UserDto } from "@saeki/schema";
import { ComponentDto } from "@saeki/schema";
import { UpdateComponentRequest } from "@saeki/schema";

export class ComponentsService {
  db: PrismaClient;

  constructor(props: { db: PrismaClient }) {
    this.db = props.db;
  }

  public async createComponent(props: {
    dto: CreateComponentRequest;
    user: UserDto;
  }): Promise<ComponentDto> {
    const defaultMaterial = await this.db.material.findFirst({
      where: { default: true },
    });

    const defaultServicePackage = await this.db.servicePackage.findFirst({
      where: { default: true },
    });

    if (!defaultMaterial) {
      throw new Error("Default material not found");
    }

    if (!defaultServicePackage) {
      throw new Error("Default service package not found");
    }

    const project = await this.db.project.findFirst({
      where: { id: props.dto.projectId, clientId: props.user.id },
    });

    const hasAccessToProject = !!project;

    if (!hasAccessToProject) {
      throw new UnauthorizedException(
        "User does not have access to parent project.",
      );
    }

    const entity = await this.db.component.create({
      data: {
        projectId: props.dto.projectId,
        fileId: props.dto.fileId,
        materialId: defaultMaterial.id,
        servicePackageId: defaultServicePackage.id,
      },
      include: { material: true, servicePackage: true },
    });

    const mappedEntity = ComponentDto.fromEntity(entity);

    return mappedEntity;
  }

  public async getManyComponents(props: {
    user: UserDto;
  }): Promise<ComponentDto[]> {
    const entities = await this.db.component.findMany({
      where: { project: { clientId: props.user.id } },
      include: { material: true, servicePackage: true },
      orderBy: { createdAt: "desc" },
    });

    const mappedEntities = entities.map((it) => {
      return ComponentDto.fromEntity(it);
    });

    return mappedEntities;
  }

  public async getComponentsByProjectId(props: {
    id: string;
    user: UserDto;
  }): Promise<ComponentDto[]> {
    const userIdCriteria = !props.user.isAdmin ? props.user.id : undefined;

    const project = await this.db.project.findFirst({
      where: { id: props.id, clientId: userIdCriteria },
    });

    if (!project) {
      throw new NotFoundException();
    }

    const entities = await this.db.component.findMany({
      where: { projectId: props.id },
      orderBy: { createdAt: "desc" },
    });

    const mappedEntities = entities.map((it) => {
      return ComponentDto.fromEntity(it);
    });

    return mappedEntities;
  }

  public async getComponentsByOrderId(props: {
    id: string;
    user: UserDto;
  }): Promise<ComponentDto[]> {
    const userIdCriteria = !props.user.isAdmin ? props.user.id : undefined;

    const order = await this.db.order.findFirst({
      where: { id: props.id, clientId: userIdCriteria },
    });

    if (!order) {
      throw new NotFoundException();
    }

    const entities = await this.db.component.findMany({
      where: { orderId: props.id },
      orderBy: { createdAt: "desc" },
    });

    const mappedEntities = entities.map((it) => {
      return ComponentDto.fromEntity(it);
    });

    return mappedEntities;
  }

  public async getComponent(props: {
    id: string;
    user: UserDto;
  }): Promise<ComponentDto> {
    const userIdCriteria = !props.user.isAdmin ? props.user.id : undefined;

    const entity = await this.db.component.findFirst({
      where: { id: props.id, project: { clientId: userIdCriteria } },
      include: { material: true, servicePackage: true },
    });

    if (!entity) {
      throw new NotFoundException();
    }

    const mappedEntity = ComponentDto.fromEntity(entity);

    return mappedEntity;
  }

  public async updateComponent(props: {
    id: string;
    dto: UpdateComponentRequest;
    user: UserDto;
  }): Promise<ComponentDto> {
    const originalEntity = await this.assertEntityExists(props);

    if (originalEntity.readOnly) {
      throw new ForbiddenException();
    }

    const entity = await this.db.component.update({
      where: { id: props.id, project: { clientId: props.user.id } },
      data: props.dto,
      include: {
        material: true,
        servicePackage: true,
      },
    });

    const mappedEntity = ComponentDto.fromEntity(entity);

    return mappedEntity;
  }

  public async deleteComponent(props: {
    id: string;
    user: UserDto;
  }): Promise<ComponentDto> {
    const originalEntity = await this.assertEntityExists(props);

    if (originalEntity.readOnly) {
      throw new ForbiddenException();
    }

    const entity = await this.db.component.delete({
      where: { id: props.id, project: { clientId: props.user.id } },
      include: {
        material: true,
        servicePackage: true,
      },
    });

    const mappedEntity = ComponentDto.fromEntity(entity);

    return mappedEntity;
  }

  private async assertEntityExists(props: {
    id: string;
    user: UserDto;
  }): Promise<Prisma.ComponentGetPayload<{ include: { project: true } }>> {
    const entity = await this.db.component.findFirst({
      where: { id: props.id, project: { clientId: props.user.id } },
      include: { project: true },
    });

    if (!entity) {
      throw new NotFoundException();
    }

    return entity;
  }
}
