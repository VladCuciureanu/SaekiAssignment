import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { OrdersService } from "./orders.service";
import { UserDto } from "../users/dtos/user.dto";
import { InvalidPayloadException } from "../common/exceptions/invalid-payload.exception";

export class OrdersController {
  db: PrismaClient;
  service: OrdersService;

  constructor(props: { db: PrismaClient }) {
    this.db = props.db;
    this.service = new OrdersService({ db: this.db });
  }

  public async createOrder(req: Request, res: Response, next: NextFunction) {
    const dto = req.body;
    const user = res.locals.user as UserDto;

    const entity = await this.service.createOrder({ dto, user });

    res.json(entity);
  }

  public async getManyOrders(req: Request, res: Response, next: NextFunction) {
    const user = res.locals.user as UserDto;

    const entities = await this.service.getManyOrders({ user });

    res.json(entities);
  }

  public async getOrder(req: Request, res: Response, next: NextFunction) {
    const user = res.locals.user as UserDto;
    const id = req.params.id;

    if (!id) {
      throw new InvalidPayloadException([{ id: "Order ID is required" }]);
    }

    const entity = await this.service.getOrder({ id, user });

    res.json(entity);
  }

  public async updateOrder(req: Request, res: Response, next: NextFunction) {
    const dto = req.body;
    const user = res.locals.user as UserDto;
    const id = req.params.id;

    if (!id) {
      throw new InvalidPayloadException([{ id: "Order ID is required" }]);
    }

    const entity = await this.service.updateOrder({ id, dto, user });

    res.json(entity);
  }
}
