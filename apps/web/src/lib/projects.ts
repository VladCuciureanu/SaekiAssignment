import { ProjectDto } from "@/types/saeki/project.dto";

export async function createProject(project: ProjectDto): Promise<ProjectDto> {
  return await fetch("/api/projects", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(project),
  }).then((res) => res.json());
}

export async function getManyProjects(): Promise<ProjectDto[]> {
  return await fetch("/api/projects").then((res) => res.json());
}

export async function getProject(id: string): Promise<ProjectDto> {
  return await fetch(`/api/projects/${id}`).then((res) => res.json());
}

export async function updateProject(project: ProjectDto): Promise<ProjectDto> {
  return await fetch(`/api/projects/${project.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(project),
  }).then((res) => res.json());
}

export async function deleteProject(id: string): Promise<ProjectDto> {
  return await fetch(`/api/projects/${id}`, {
    method: "DELETE",
  }).then((res) => res.json());
}
