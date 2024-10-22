import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { ServicePackagesService } from "./service-packages.service";
import { InvalidPayloadException } from "../common/exceptions/invalid-payload.exception";
import { UserDto } from "@saeki/schema";

export class ServicePackagesController {
  db: PrismaClient;
  service: ServicePackagesService;

  constructor(props: { db: PrismaClient }) {
    this.db = props.db;
    this.service = new ServicePackagesService({ db: this.db });
  }

  public async getManyServicePackages(
    _req: Request,
    res: Response,
    _next: NextFunction,
  ) {
    const entities = await this.service.getManyServicePackages();

    res.json(entities);
  }

  public async getServicePackage(
    req: Request,
    res: Response,
    _next: NextFunction,
  ) {
    const user = res.locals.user as UserDto;
    const id = req.params.id;

    if (!id) {
      throw new InvalidPayloadException([
        { id: "Service package ID is required" },
      ]);
    }

    const entity = await this.service.getServicePackage({ id, user });

    res.json(entity);
  }
}
