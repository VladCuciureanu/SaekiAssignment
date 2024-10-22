import { PrismaClient } from "@prisma/client";
import { NotFoundException } from "../common/exceptions/not-found-exception";
import { UserDto } from "@saeki/schema";
import { FileDto } from "@saeki/schema";

export class FilesService {
  db: PrismaClient;

  constructor(props: { db: PrismaClient }) {
    this.db = props.db;
  }

  public async createFile(props: {
    originalName: string;
    filepath: string;
    user: UserDto;
  }): Promise<FileDto> {
    const client = await this.db.user.findUnique({
      where: { id: props.user.id },
    });

    if (!client) {
      console.error("Client not found");
      throw new NotFoundException();
    }

    const entity = await this.db.file.create({
      data: {
        name: props.originalName,
        uri: props.filepath,
        clientId: props.user.id,
      },
    });

    const mappedEntity = FileDto.fromEntity(entity);

    return mappedEntity;
  }

  public async getFile(props: { id: string; user: UserDto }): Promise<FileDto> {
    const userIdCriteria = !props.user.isAdmin ? props.user.id : undefined;

    const entity = await this.db.file.findFirst({
      where: { id: props.id, clientId: userIdCriteria },
    });

    if (!entity) {
      throw new NotFoundException();
    }

    const mappedEntity = FileDto.fromEntity(entity);

    return mappedEntity;
  }

  public async getFileUri(props: {
    id: string;
    user: UserDto;
  }): Promise<string> {
    const userIdCriteria = !props.user.isAdmin ? props.user.id : undefined;

    const entity = await this.db.file.findFirst({
      where: { id: props.id, clientId: userIdCriteria },
    });

    if (!entity) {
      throw new NotFoundException();
    }

    return entity.uri;
  }
}
