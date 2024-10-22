import { ComponentDto, UpdateComponentRequest } from "@saeki/schema";
import { CreateComponentRequest } from "@saeki/schema";

export async function createComponent(
  dto: CreateComponentRequest,
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

export async function getComponentsByOrderId(
  id: string,
): Promise<ComponentDto[]> {
  return await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/orders/${id}/components`,
    {
      credentials: "include",
    },
  ).then((res) => {
    if (res.status / 100 === 2) return res.json();
    return [];
  });
}

export async function getComponentsByProjectId(
  id: string,
): Promise<ComponentDto[]> {
  return await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/projects/${id}/components`,
    {
      credentials: "include",
    },
  ).then((res) => {
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

export async function updateComponent(
  id: string,
  dto: UpdateComponentRequest,
): Promise<ComponentDto> {
  return await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/components/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(dto),
    },
  ).then((res) => res.json());
}

export async function deleteComponent(id: string): Promise<ComponentDto> {
  return await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/components/${id}`,
    {
      method: "DELETE",
      credentials: "include",
    },
  ).then((res) => res.json());
}
