import { Prisma } from "@prisma/client";
import { ProjectItemDto } from "../../project-items/dtos/project-item.dto";

export class ProjectDto {
  id: string;
  items: ProjectItemDto[];
  createdAt: Date;

  constructor(props: { id: string; items: ProjectItemDto[]; createdAt: Date }) {
    this.id = props.id;
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
      items: entity.items.map((it) => {
        return ProjectItemDto.fromEntity(it);
      }),
      createdAt: entity.createdAt,
    });
  }

  static fromJson(json: any): ProjectDto {
    return new ProjectDto({
      id: json.id,
      items: json.items.map((it: any) => {
        return ProjectItemDto.fromJson(it);
      }),
      createdAt: new Date(json.createdAt),
    });
  }
}
