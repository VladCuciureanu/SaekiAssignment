import {
  CreateProjectRequest,
  ProjectDto,
  UpdateProjectRequest,
} from "@saeki/schema";

export async function createProject(
  dto: CreateProjectRequest,
): Promise<ProjectDto> {
  return await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/projects`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(dto),
  }).then((res) => res.json().then((res) => ProjectDto.fromJson(res)));
}

export async function getManyProjects(): Promise<ProjectDto[]> {
  return await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/projects`, {
    credentials: "include",
  }).then((res) => {
    if (res.status / 100 === 2)
      return res
        .json()
        .then((res) => res.map((it: any) => ProjectDto.fromJson(it)));
    return [];
  });
}

export async function getProject(id: string): Promise<ProjectDto> {
  return await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/projects/${id}`,
    {
      credentials: "include",
    },
  ).then((res) => res.json().then((res) => ProjectDto.fromJson(res)));
}

export async function updateProject(
  id: string,
  dto: UpdateProjectRequest,
): Promise<ProjectDto> {
  return await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/projects/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(dto),
    },
  ).then((res) => res.json().then((res) => ProjectDto.fromJson(res)));
}

export async function deleteProject(id: string): Promise<ProjectDto> {
  return await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/projects/${id}`,
    {
      method: "DELETE",
      credentials: "include",
    },
  ).then((res) => res.json().then((res) => ProjectDto.fromJson(res)));
}
