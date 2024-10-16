import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { ProjectItemsService } from "./project-items.service";
import { UserDto } from "../users/dtos/user.dto";
import { InvalidPayloadException } from "../common/exceptions/invalid-payload.exception";

export class ProjectItemsController {
  db: PrismaClient;
  service: ProjectItemsService;

  constructor(props: { db: PrismaClient }) {
    this.db = props.db;
    this.service = new ProjectItemsService({ db: this.db });
  }

  public async createProjectItem(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const dto = req.body;
    const user = res.locals.user as UserDto;

    const entity = await this.service.createProjectItem({ dto, user });

    res.json(entity);
  }

  public async getManyProjectItems(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const user = res.locals.user as UserDto;

    const entities = await this.service.getManyProjectItems({ user });

    res.json(entities);
  }

  public async getProjectItem(req: Request, res: Response, next: NextFunction) {
    const user = res.locals.user as UserDto;
    const id = req.params.id;

    if (!id) {
      throw new InvalidPayloadException([
        { id: "Project item ID is required" },
      ]);
    }

    const entity = await this.service.getProjectItem({ id, user });

    res.json(entity);
  }

  public async updateProjectItem(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const dto = req.body;
    const user = res.locals.user as UserDto;
    const id = req.params.id;

    if (!id) {
      throw new InvalidPayloadException([
        { id: "Project item ID is required" },
      ]);
    }

    const entity = await this.service.updateProjectItem({ id, dto, user });

    res.json(entity);
  }

  public async deleteProjectItem(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const user = res.locals.user as UserDto;
    const id = req.params.id;

    if (!id) {
      throw new InvalidPayloadException([
        { id: "Project item ID is required" },
      ]);
    }

    const entity = await this.service.deleteProjectItem({ id, user });

    res.json(entity);
  }
}
