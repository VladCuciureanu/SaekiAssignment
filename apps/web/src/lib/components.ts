import { ComponentDto } from "@/types/saeki/component.dto";
import { CreateComponentDto } from "@/types/saeki/create-component.dto";

// import { UpdateComponentDto } from "@/types/saeki/update-component.dto";

export async function createComponent(
  dto: CreateComponentDto,
): Promise<ComponentDto> {
  return await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/components`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(dto),
  }).then((res) => res.json());
}

export async function getManyComponents(): Promise<ComponentDto[]> {
  return await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/components`, {
    credentials: "include",
  }).then((res) => {
    if (res.status / 100 === 2) return res.json();
    return [];
  });
}

export async function getComponent(id: string): Promise<ComponentDto> {
  return await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/components/${id}`,
    {
      credentials: "include",
    },
  ).then((res) => res.json());
}

// export async function updateComponent(
//   id: string,
//   dto: UpdateComponentDto,
// ): Promise<ComponentDto> {
//   return await fetch(
//     `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/components/${id}`,
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

export async function deleteComponent(id: string): Promise<ComponentDto> {
  return await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/components/${id}`,
    {
      method: "DELETE",
      credentials: "include",
    },
  ).then((res) => res.json());
}
