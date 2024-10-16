import { PrismaClient } from "@prisma/client";
import { CreateProjectDto } from "./dtos/create-project.dto";
import { UserDto } from "../users/dtos/user.dto";
import { ProjectDto } from "./dtos/project.dto";
import { UpdateProjectDto } from "./dtos/update-project.dto";
import { NotFoundException } from "../common/exceptions/not-found-exception";

export class ProjectsService {
  db: PrismaClient;

  constructor(props: { db: PrismaClient }) {
    this.db = props.db;
  }

  public async createProject(props: {
    dto: CreateProjectDto;
    user: UserDto;
  }): Promise<ProjectDto> {
    const entity = await this.db.project.create({
      data: {
        ownerId: props.user.id,
      },
      include: { items: { include: { material: true, servicePackage: true } } },
    });

    const mappedEntity = ProjectDto.fromEntity(entity);

    return mappedEntity;
  }

  public async getManyProjects(props: {
    user: UserDto;
  }): Promise<ProjectDto[]> {
    const entities = await this.db.project.findMany({
      where: { ownerId: props.user.id },
      include: { items: { include: { material: true, servicePackage: true } } },
    });

    const mappedEntities = entities.map((it) => {
      return ProjectDto.fromEntity(it);
    });

    return mappedEntities;
  }

  public async getProject(props: {
    id: string;
    user: UserDto;
  }): Promise<ProjectDto> {
    const entity = await this.db.project.findFirst({
      where: { id: props.id, ownerId: props.user.id },
      include: {
        items: { include: { material: true, servicePackage: true } },
      },
    });

    if (!entity) {
      throw new NotFoundException();
    }

    const mappedEntity = ProjectDto.fromEntity(entity);

    return mappedEntity;
  }

  public async updateProject(props: {
    id: string;
    dto: UpdateProjectDto;
    user: UserDto;
  }): Promise<ProjectDto> {
    const entity = await this.db.project.update({
      where: { id: props.id, ownerId: props.user.id },
      data: props.dto,
      include: {
        items: { include: { material: true, servicePackage: true } },
      },
    });

    const mappedEntity = ProjectDto.fromEntity(entity);

    return mappedEntity;
  }

  public async deleteProject(props: {
    id: string;
    user: UserDto;
  }): Promise<ProjectDto> {
    await this.assertEntityExists(props);

    const entity = await this.db.project.delete({
      where: { id: props.id, ownerId: props.user.id },
      include: {
        items: { include: { material: true, servicePackage: true } },
      },
    });

    const mappedEntity = ProjectDto.fromEntity(entity);

    return mappedEntity;
  }

  private async assertEntityExists(props: { id: string; user: UserDto }) {
    const res = await this.db.project.findFirst({
      where: { id: props.id, ownerId: props.user.id },
    });
    if (!res) {
      throw new NotFoundException();
    }
  }
}
