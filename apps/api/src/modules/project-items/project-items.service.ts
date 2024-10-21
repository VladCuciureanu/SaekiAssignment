import { Prisma, PrismaClient, ProjectItemStatus } from "@prisma/client";
import { CreateProjectItemDto } from "./dtos/create-project-item.dto";
import { UserDto } from "../users/dtos/user.dto";
import { ProjectItemDto } from "./dtos/project-item.dto";
import { UpdateProjectItemDto } from "./dtos/update-project-item.dto";
import { NotFoundException } from "../common/exceptions/not-found-exception";
import { UnauthorizedException } from "../auth/exceptions/unauthorized.exception";
import { ForbiddenException } from "../common/exceptions/forbidden.exception";

export class ProjectItemsService {
  db: PrismaClient;

  constructor(props: { db: PrismaClient }) {
    this.db = props.db;
  }

  public async createProjectItem(props: {
    dto: CreateProjectItemDto;
    user: UserDto;
  }): Promise<ProjectItemDto> {
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

    const entity = await this.db.projectItem.create({
      data: {
        projectId: props.dto.projectId,
        assetUrl: props.dto.assetUrl,
        materialId: defaultMaterial.id,
        servicePackageId: defaultServicePackage.id,
      },
      include: { material: true, servicePackage: true },
    });

    const mappedEntity = ProjectItemDto.fromEntity(entity);

    return mappedEntity;
  }

  public async getManyProjectItems(props: {
    user: UserDto;
  }): Promise<ProjectItemDto[]> {
    const entities = await this.db.projectItem.findMany({
      where: { project: { clientId: props.user.id } },
      include: { material: true, servicePackage: true },
      orderBy: { createdAt: "desc" },
    });

    const mappedEntities = entities.map((it) => {
      return ProjectItemDto.fromEntity(it);
    });

    return mappedEntities;
  }

  public async getProjectItem(props: {
    id: string;
    user: UserDto;
  }): Promise<ProjectItemDto> {
    const entity = await this.db.projectItem.findFirst({
      where: { id: props.id, project: { clientId: props.user.id } },
      include: { material: true, servicePackage: true },
    });

    if (!entity) {
      throw new NotFoundException();
    }

    const mappedEntity = ProjectItemDto.fromEntity(entity);

    return mappedEntity;
  }

  public async updateProjectItem(props: {
    id: string;
    dto: UpdateProjectItemDto;
    user: UserDto;
  }): Promise<ProjectItemDto> {
    const originalEntity = await this.assertEntityExists(props);

    if (originalEntity.status === ProjectItemStatus.ReadOnly) {
      throw new ForbiddenException();
    }

    const entity = await this.db.projectItem.update({
      where: { id: props.id, project: { clientId: props.user.id } },
      data: props.dto,
      include: {
        material: true,
        servicePackage: true,
      },
    });

    const mappedEntity = ProjectItemDto.fromEntity(entity);

    return mappedEntity;
  }

  public async deleteProjectItem(props: {
    id: string;
    user: UserDto;
  }): Promise<ProjectItemDto> {
    const originalEntity = await this.assertEntityExists(props);

    if (originalEntity.status === ProjectItemStatus.ReadOnly) {
      throw new ForbiddenException();
    }

    const entity = await this.db.projectItem.delete({
      where: { id: props.id, project: { clientId: props.user.id } },
      include: {
        material: true,
        servicePackage: true,
      },
    });

    const mappedEntity = ProjectItemDto.fromEntity(entity);

    return mappedEntity;
  }

  private async assertEntityExists(props: {
    id: string;
    user: UserDto;
  }): Promise<Prisma.ProjectItemGetPayload<{ include: { project: true } }>> {
    const entity = await this.db.projectItem.findFirst({
      where: { id: props.id, project: { clientId: props.user.id } },
      include: { project: true },
    });

    if (!entity) {
      throw new NotFoundException();
    }

    return entity;
  }
}
