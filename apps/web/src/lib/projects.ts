import { ProjectDto } from "@/types/saeki/project.dto";

export async function createProject(project: ProjectDto): Promise<ProjectDto> {
  return await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/projects`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(project),
  }).then((res) => res.json());
}

export async function getManyProjects(): Promise<ProjectDto[]> {
  return await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/projects`, {
    credentials: "include",
  }).then((res) => {
    if (res.status / 100 === 2) return res.json();
    return [];
  });
}

export async function getProject(id: string): Promise<ProjectDto> {
  return await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/projects/${id}`,
    {
      credentials: "include",
    },
  ).then((res) => res.json());
}

export async function updateProject(project: ProjectDto): Promise<ProjectDto> {
  return await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/projects/${project.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(project),
    },
  ).then((res) => res.json());
}

export async function deleteProject(id: string): Promise<ProjectDto> {
  return await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/projects/${id}`,
    {
      method: "DELETE",
      credentials: "include",
    },
  ).then((res) => res.json());
}
