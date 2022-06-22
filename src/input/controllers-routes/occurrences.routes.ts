import { Controller, Get, Post, Put, Delete } from "@overnightjs/core";
import { NextFunction, Request, Response } from "express";
import Occurrence from "../../domain/entities/occurrence";
import IRepositoriesWrapper from "../../output/repositories/repositories-wrapper-interface";
import IEncryptor from "../../security/encryptor-interface";
import {
  DeleteController,
  FindByIdController,
  RegisterController,
  UpdateController,
} from "../controllers-factory";

@Controller("api/occurrences")
export class OccurrencesControllers {
  constructor(
    private repositories: IRepositoriesWrapper,
    private encryptor: IEncryptor
  ) {}

  @Get(":id")
  get(req: Request, res: Response, next: NextFunction) {
    const controller = new FindByIdController<Occurrence.Entity>(
      this.repositories.occurrences
    );
    return controller.handle(req, res, next);
  }

  @Post()
  post(req: Request, res: Response, next: NextFunction) {
    const controller = new RegisterController<Occurrence.Entity>(
      this.repositories.occurrences,
      this.encryptor
    );
    return controller.handle(req, res, next);
  }

  @Put(":id")
  put(req: Request, res: Response, next: NextFunction) {
    const controller = new UpdateController<Occurrence.Entity>(
      this.repositories.occurrences
    );
    return controller.handle(req, res, next);
  }

  @Delete(":id")
  delete(req: Request, res: Response, next: NextFunction) {
    const controller = new DeleteController<Occurrence.Entity>(
      this.repositories.occurrences
    );
    return controller.handle(req, res, next);
  }
}
