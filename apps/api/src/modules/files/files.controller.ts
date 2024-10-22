import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { FilesService } from "./files.service";
import { InvalidPayloadException } from "../common/exceptions/invalid-payload.exception";
import { UserDto } from "@saeki/schema";

export class FilesController {
  db: PrismaClient;
  service: FilesService;

  constructor(props: { db: PrismaClient }) {
    this.db = props.db;
    this.service = new FilesService({ db: this.db });
  }

  public async createFile(req: Request, res: Response, _next: NextFunction) {
    const file = req.file;
    const user = res.locals.user as UserDto;

    if (!file) {
      throw new InvalidPayloadException([{ file: "File is required" }]);
    }

    const entity = await this.service.createFile({
      originalName: file.originalname,
      filepath: file.path,
      user,
    });

    res.json(entity);
  }

  public async getFile(req: Request, res: Response, _next: NextFunction) {
    const user = res.locals.user as UserDto;
    const id = req.params.id;

    if (!id) {
      throw new InvalidPayloadException([{ id: "File ID is required" }]);
    }

    const entity = await this.service.getFile({ id, user });

    res.json(entity);
  }

  public async getFileRaw(req: Request, res: Response, _next: NextFunction) {
    const user = res.locals.user as UserDto;
    const id = req.params.id;

    if (!id) {
      throw new InvalidPayloadException([{ id: "File ID is required" }]);
    }

    const fileUri = await this.service.getFileUri({ id, user });

    res.download(fileUri);
  }
}
