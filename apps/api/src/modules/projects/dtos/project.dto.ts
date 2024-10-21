import { Prisma } from "@prisma/client";
import { ComponentDto } from "../../components/dtos/component.dto";

export class ProjectDto {
  id: string;
  components: ComponentDto[];
  createdAt: Date;

  constructor(props: {
    id: string;
    components: ComponentDto[];
    createdAt: Date;
  }) {
    this.id = props.id;
    this.components = props.components;
    this.createdAt = props.createdAt;
  }

  static fromEntity(
    entity: Prisma.ProjectGetPayload<{
      include: {
        components: { include: { material: true; servicePackage: true } };
      };
    }>,
  ): ProjectDto {
    return new ProjectDto({
      id: entity.id,
      components: entity.components.map((it) => {
        return ComponentDto.fromEntity(it);
      }),
      createdAt: entity.createdAt,
    });
  }

  static fromJson(json: any): ProjectDto {
    return new ProjectDto({
      id: json.id,
      components: json.components.map((it: unknown) => {
        return ComponentDto.fromJson(it);
      }),
      createdAt: new Date(json.createdAt),
    });
  }
}
