import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { ComponentsService } from "./components.service";
import { InvalidPayloadException } from "../common/exceptions/invalid-payload.exception";
import { UserDto } from "@saeki/schema";

export class ComponentsController {
  db: PrismaClient;
  service: ComponentsService;

  constructor(props: { db: PrismaClient }) {
    this.db = props.db;
    this.service = new ComponentsService({ db: this.db });
  }

  public async createComponent(
    req: Request,
    res: Response,
    _next: NextFunction,
  ) {
    const dto = req.body;
    const user = res.locals.user as UserDto;

    const entity = await this.service.createComponent({ dto, user });

    res.json(entity);
  }

  public async getManyComponents(
    req: Request,
    res: Response,
    _next: NextFunction,
  ) {
    const user = res.locals.user as UserDto;

    const entities = await this.service.getManyComponents({ user });

    res.json(entities);
  }

  public async getComponent(req: Request, res: Response, _next: NextFunction) {
    const user = res.locals.user as UserDto;
    const id = req.params.id;

    if (!id) {
      throw new InvalidPayloadException([{ id: "Component ID is required" }]);
    }

    const entity = await this.service.getComponent({ id, user });

    res.json(entity);
  }

  public async getComponentsByProjectId(
    req: Request,
    res: Response,
    _next: NextFunction,
  ) {
    const user = res.locals.user as UserDto;
    const id = req.params.id;

    if (!id) {
      throw new InvalidPayloadException([{ id: "Project ID is required" }]);
    }

    const entities = await this.service.getComponentsByProjectId({ id, user });

    res.json(entities);
  }

  public async getComponentsByOrderId(
    req: Request,
    res: Response,
    _next: NextFunction,
  ) {
    const user = res.locals.user as UserDto;
    const id = req.params.id;

    if (!id) {
      throw new InvalidPayloadException([{ id: "Order ID is required" }]);
    }

    const entities = await this.service.getComponentsByOrderId({ id, user });

    res.json(entities);
  }

  public async updateComponent(
    req: Request,
    res: Response,
    _next: NextFunction,
  ) {
    const dto = req.body;
    const user = res.locals.user as UserDto;
    const id = req.params.id;

    if (!id) {
      throw new InvalidPayloadException([{ id: "Component ID is required" }]);
    }

    const entity = await this.service.updateComponent({ id, dto, user });

    res.json(entity);
  }

  public async deleteComponent(
    req: Request,
    res: Response,
    _next: NextFunction,
  ) {
    const user = res.locals.user as UserDto;
    const id = req.params.id;

    if (!id) {
      throw new InvalidPayloadException([{ id: "Component ID is required" }]);
    }

    const entity = await this.service.deleteComponent({ id, user });

    res.json(entity);
  }
}
