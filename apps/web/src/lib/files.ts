import { FileDto } from "@saeki/schema";

export async function createFile(file: File): Promise<FileDto> {
  const data = new FormData();
  data.append("content", file);
  return await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/files`, {
    method: "POST",
    headers: {},
    credentials: "include",
    body: data,
  }).then((res) => res.json().then((res) => FileDto.fromJson(res)));
}

export async function getFile(id: string): Promise<FileDto> {
  return await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/files/${id}`, {
    credentials: "include",
  }).then((res) => res.json().then((res) => FileDto.fromJson(res)));
}

export async function getFileRaw(id: string): Promise<Blob> {
  return await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/files/${id}/raw`,
    {
      credentials: "include",
    },
  ).then((res) => res.blob());
}
