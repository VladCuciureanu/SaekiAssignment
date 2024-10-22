import { PrismaClient } from "@prisma/client";
import { NotFoundException } from "../common/exceptions/not-found-exception";
import { UserDto } from "@saeki/schema";
import { ServicePackageDto } from "@saeki/schema";

export class ServicePackagesService {
  db: PrismaClient;

  constructor(props: { db: PrismaClient }) {
    this.db = props.db;
  }

  public async getManyServicePackages(): Promise<ServicePackageDto[]> {
    const entities = await this.db.servicePackage.findMany({
      where: { archived: false },
      orderBy: { price: "desc" },
    });

    const mappedEntities = entities.map((it) => {
      return ServicePackageDto.fromEntity(it);
    });

    return mappedEntities;
  }

  public async getServicePackage(props: {
    id: string;
    user: UserDto;
  }): Promise<ServicePackageDto> {
    const entity = await this.db.servicePackage.findFirst({
      where: { id: props.id },
    });

    if (!entity) {
      throw new NotFoundException();
    }

    const mappedEntity = ServicePackageDto.fromEntity(entity);

    return mappedEntity;
  }
}
