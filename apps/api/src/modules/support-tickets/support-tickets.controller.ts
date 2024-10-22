import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { SupportTicketsService } from "./support-tickets.service";
import { InvalidPayloadException } from "../common/exceptions/invalid-payload.exception";
import { UserDto } from "@saeki/schema";

export class SupportTicketsController {
  db: PrismaClient;
  service: SupportTicketsService;

  constructor(props: { db: PrismaClient }) {
    this.db = props.db;
    this.service = new SupportTicketsService({ db: this.db });
  }

  public async createSupportTicket(
    req: Request,
    res: Response,
    _next: NextFunction,
  ) {
    const dto = req.body;
    const user = res.locals.user as UserDto;

    const entity = await this.service.createSupportTicket({ dto, user });

    res.json(entity);
  }

  public async getManySupportTickets(
    _req: Request,
    res: Response,
    _next: NextFunction,
  ) {
    const user = res.locals.user as UserDto;

    const entities = await this.service.getManySupportTickets({ user });

    res.json(entities);
  }

  public async getSupportTicket(
    req: Request,
    res: Response,
    _next: NextFunction,
  ) {
    const user = res.locals.user as UserDto;
    const id = req.params.id;

    if (!id) {
      throw new InvalidPayloadException([
        { id: "Support ticket ID is required" },
      ]);
    }

    const entity = await this.service.getSupportTicket({ id, user });

    res.json(entity);
  }

  public async deleteSupportTicket(
    req: Request,
    res: Response,
    _next: NextFunction,
  ) {
    const user = res.locals.user as UserDto;
    const id = req.params.id;

    if (!id) {
      throw new InvalidPayloadException([
        { id: "Support ticket ID is required" },
      ]);
    }

    const entity = await this.service.deleteSupportTicket({ id, user });

    res.json(entity);
  }
}
