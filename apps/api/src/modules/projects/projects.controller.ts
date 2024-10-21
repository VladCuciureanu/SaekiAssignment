import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { ProjectsService } from "./projects.service";
import { UserDto } from "../users/dtos/user.dto";
import { InvalidPayloadException } from "../common/exceptions/invalid-payload.exception";

export class ProjectsController {
  db: PrismaClient;
  service: ProjectsService;

  constructor(props: { db: PrismaClient }) {
    this.db = props.db;
    this.service = new ProjectsService({ db: this.db });
  }

  public async createProject(req: Request, res: Response, _next: NextFunction) {
    const dto = req.body;
    const user = res.locals.user as UserDto;

    const entity = await this.service.createProject({ dto, user });

    res.json(entity);
  }

  public async getManyProjects(
    _req: Request,
    res: Response,
    _next: NextFunction,
  ) {
    const user = res.locals.user as UserDto;

    const entities = await this.service.getManyProjects({ user });

    res.json(entities);
  }

  public async getProject(req: Request, res: Response, _next: NextFunction) {
    const user = res.locals.user as UserDto;
    const id = req.params.id;

    if (!id) {
      throw new InvalidPayloadException([{ id: "Project ID is required" }]);
    }

    const entity = await this.service.getProject({ id, user });

    res.json(entity);
  }

  public async updateProject(req: Request, res: Response, _next: NextFunction) {
    const dto = req.body;
    const user = res.locals.user as UserDto;
    const id = req.params.id;

    if (!id) {
      throw new InvalidPayloadException([{ id: "Project ID is required" }]);
    }

    const entity = await this.service.updateProject({ id, dto, user });

    res.json(entity);
  }

  public async deleteProject(req: Request, res: Response, _next: NextFunction) {
    const user = res.locals.user as UserDto;
    const id = req.params.id;

    if (!id) {
      throw new InvalidPayloadException([{ id: "Project ID is required" }]);
    }

    const entity = await this.service.deleteProject({ id, user });

    res.json(entity);
  }
}
