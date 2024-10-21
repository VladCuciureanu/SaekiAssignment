export class ProjectDto {
  id: string;
  clientId: string;
  createdAt: Date;

  constructor(props: { id: string; clientId: string; createdAt: Date }) {
    this.id = props.id;
    this.clientId = props.clientId;
    this.createdAt = props.createdAt;
  }

  static fromJson(json: any): ProjectDto {
    return new ProjectDto({
      id: json.id,
      clientId: json.clientId,
      createdAt: new Date(json.createdAt),
    });
  }
}
