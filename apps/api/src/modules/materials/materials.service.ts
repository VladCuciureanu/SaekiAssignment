import { PrismaClient } from "@prisma/client";
import { NotFoundException } from "../common/exceptions/not-found-exception";
import { UserDto } from "@saeki/schema";
import { MaterialDto } from "@saeki/schema";

export class MaterialsService {
  db: PrismaClient;

  constructor(props: { db: PrismaClient }) {
    this.db = props.db;
  }

  public async getManyMaterials(): Promise<MaterialDto[]> {
    const entities = await this.db.material.findMany({
      where: { archived: false },
      orderBy: { price: "desc" },
    });

    const mappedEntities = entities.map((it) => {
      return MaterialDto.fromEntity(it);
    });

    return mappedEntities;
  }

  public async getMaterial(props: {
    id: string;
    user: UserDto;
  }): Promise<MaterialDto> {
    const entity = await this.db.material.findFirst({
      where: { id: props.id },
    });

    if (!entity) {
      throw new NotFoundException();
    }

    const mappedEntity = MaterialDto.fromEntity(entity);

    return mappedEntity;
  }
}
