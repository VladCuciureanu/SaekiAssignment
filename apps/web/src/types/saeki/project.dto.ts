import { ProjectItemDto } from "./project-item.dto";

export enum ProjectStatus {
  Created = "Created",
  AutoQuoted = "AutoQuoted",
  ManuallyQuoted = "ManuallyQuoted",
  Ordered = "Ordered",
  InProduction = "InProduction",
  ReadyForShipping = "ReadyForShipping",
  Shipped = "Shipped",
  Delivered = "Delivered",
}

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
}
