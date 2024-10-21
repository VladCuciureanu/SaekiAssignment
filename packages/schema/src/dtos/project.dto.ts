import { ComponentDto } from "./component.dto";

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
