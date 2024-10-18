import { ProjectStatus } from "@/types/saeki/project.dto";

export const projectStatusFilterOptions = [
  ...Object.keys(ProjectStatus).map((status) => ({
    value: status,
    label: status,
  })),
];
