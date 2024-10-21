import { CreateProjectItemDto } from "@/types/saeki/create-project-item.dto";
import { ProjectItemDto } from "@/types/saeki/project-item.dto";

// import { UpdateProjectItemDto } from "@/types/saeki/update-project-item.dto";

export async function createProjectItem(
  dto: CreateProjectItemDto,
): Promise<ProjectItemDto> {
  return await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/project-items`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(dto),
    },
  ).then((res) => res.json());
}

export async function getManyProjectItems(): Promise<ProjectItemDto[]> {
  return await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/project-items`,
    {
      credentials: "include",
    },
  ).then((res) => {
    if (res.status / 100 === 2) return res.json();
    return [];
  });
}

export async function getProjectItem(id: string): Promise<ProjectItemDto> {
  return await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/project-items/${id}`,
    {
      credentials: "include",
    },
  ).then((res) => res.json());
}

// export async function updateProjectItem(
//   id: string,
//   dto: UpdateProjectItemDto,
// ): Promise<ProjectItemDto> {
//   return await fetch(
//     `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/project-items/${id}`,
//     {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       credentials: "include",
//       body: JSON.stringify(dto),
//     },
//   ).then((res) => res.json());
// }

export async function deleteProjectItem(id: string): Promise<ProjectItemDto> {
  return await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/project-items/${id}`,
    {
      method: "DELETE",
      credentials: "include",
    },
  ).then((res) => res.json());
}
