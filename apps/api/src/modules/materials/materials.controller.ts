import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { MaterialsService } from "./materials.service";
import { InvalidPayloadException } from "../common/exceptions/invalid-payload.exception";
import { UserDto } from "@saeki/schema";

export class MaterialsController {
  db: PrismaClient;
  service: MaterialsService;

  constructor(props: { db: PrismaClient }) {
    this.db = props.db;
    this.service = new MaterialsService({ db: this.db });
  }

  public async getManyMaterials(
    _req: Request,
    res: Response,
    _next: NextFunction,
  ) {
    const entities = await this.service.getManyMaterials();

    res.json(entities);
  }

  public async getMaterial(req: Request, res: Response, _next: NextFunction) {
    const user = res.locals.user as UserDto;
    const id = req.params.id;

    if (!id) {
      throw new InvalidPayloadException([{ id: "Material ID is required" }]);
    }

    const entity = await this.service.getMaterial({ id, user });

    res.json(entity);
  }
}
