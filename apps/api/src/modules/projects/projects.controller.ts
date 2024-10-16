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

  public async createProject(req: Request, res: Response, next: NextFunction) {
    const dto = req.body;
    const user = res.locals.user as UserDto;

    const result = await this.service.createProject({ dto, user });

    res.json(result);
  }

  public async getManyProjects(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const user = res.locals.user as UserDto;

    const results = await this.service.getManyProjects({ user });

    res.json(results);
  }

  public async getProject(req: Request, res: Response, next: NextFunction) {
    const user = res.locals.user as UserDto;
    const id = req.params.id;

    if (!id) {
      throw new InvalidPayloadException([{ id: "Project ID is required" }]);
    }

    const results = await this.service.getProject({ id, user });

    res.json(results);
  }

  public async updateProject(req: Request, res: Response, next: NextFunction) {
    const dto = req.body;
    const user = res.locals.user as UserDto;
    const id = req.params.id;

    if (!id) {
      throw new InvalidPayloadException([{ id: "Project ID is required" }]);
    }

    const results = await this.service.updateProject({ id, dto, user });

    res.json(results);
  }

  public async deleteProject(req: Request, res: Response, next: NextFunction) {
    const user = res.locals.user as UserDto;
    const id = req.params.id;

    if (!id) {
      throw new InvalidPayloadException([{ id: "Project ID is required" }]);
    }

    const results = await this.service.deleteProject({ id, user });

    res.json(results);
  }
}
