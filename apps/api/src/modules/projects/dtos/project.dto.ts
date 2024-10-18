import { Prisma, ProjectStatus } from "@prisma/client";
import { ProjectItemDto } from "../../project-items/dtos/project-item.dto";

export class ProjectDto {
  id: string;
  status: ProjectStatus;
  items: ProjectItemDto[];
  createdAt: Date;

  constructor(props: {
    id: string;
    status: ProjectStatus;
    items: ProjectItemDto[];
    createdAt: Date;
  }) {
    this.id = props.id;
    this.status = props.status;
    this.items = props.items;
    this.createdAt = props.createdAt;
  }

  static fromEntity(
    entity: Prisma.ProjectGetPayload<{
      include: { items: { include: { material: true; servicePackage: true } } };
    }>,
  ): ProjectDto {
    return new ProjectDto({
      id: entity.id,
      status: entity.status,
      items: entity.items.map((it) => {
        return ProjectItemDto.fromEntity(it);
      }),
      createdAt: entity.createdAt,
    });
  }
}
