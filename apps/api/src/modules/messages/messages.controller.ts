import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { MessagesService } from "./messages.service";
import { UserDto } from "@saeki/schema";
import { InvalidPayloadException } from "../common/exceptions/invalid-payload.exception";

export class MessagesController {
  db: PrismaClient;
  service: MessagesService;

  constructor(props: { db: PrismaClient }) {
    this.db = props.db;
    this.service = new MessagesService({ db: this.db });
  }

  public async createMessage(req: Request, res: Response, _next: NextFunction) {
    const dto = req.body;
    const user = res.locals.user as UserDto;

    const entity = await this.service.createMessage({ dto, user });

    res.json(entity);
  }

  public async getMessagesBySupportTicketId(
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

    const entities = await this.service.getMessagesBySupportTicketId({
      id,
      user,
    });

    res.json(entities);
  }
}
