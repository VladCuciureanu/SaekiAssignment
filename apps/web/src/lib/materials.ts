import { MaterialDto } from "@saeki/schema";

export async function getManyMaterials(): Promise<MaterialDto[]> {
  return await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/materials`, {
    credentials: "include",
  }).then((res) => {
    if (res.status / 100 === 2)
      return res
        .json()
        .then((res) => res.map((it: any) => MaterialDto.fromJson(it)));
    return [];
  });
}

export async function getMaterial(id: string): Promise<MaterialDto> {
  return await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/materials/${id}`,
    {
      credentials: "include",
    },
  ).then((res) => res.json().then((res) => MaterialDto.fromJson(res)));
}
