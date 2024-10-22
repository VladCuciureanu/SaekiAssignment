import { ServicePackageDto } from "@saeki/schema";

export async function getManyServicePackages(): Promise<ServicePackageDto[]> {
  return await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/service-packages`,
    {
      credentials: "include",
    },
  ).then((res) => {
    if (res.status / 100 === 2)
      return res
        .json()
        .then((res) => res.map((it: any) => ServicePackageDto.fromJson(it)));
    return [];
  });
}

export async function getServicePackage(
  id: string,
): Promise<ServicePackageDto> {
  return await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/service-packages/${id}`,
    {
      credentials: "include",
    },
  ).then((res) => res.json().then((res) => ServicePackageDto.fromJson(res)));
}
