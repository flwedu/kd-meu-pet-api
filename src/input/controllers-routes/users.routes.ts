import { Controller, Get, Post, Put, Delete } from "@overnightjs/core";
import { NextFunction, Request, Response } from "express";
import User from "../../domain/entities/user";
import IRepositoriesWrapper from "../../output/repositories/repositories-wrapper-interface";
import IEncryptor from "../../security/encryptor-interface";
import {
  DeleteController,
  FindByIdController,
  RegisterController,
  UpdateController,
} from "../controllers-factory";

@Controller("/api/users")
export class UsersControllers {
  constructor(
    private repositories: IRepositoriesWrapper,
    private encryptor: IEncryptor
  ) {}

  @Get("/:id")
  get(req: Request, res: Response, next: NextFunction) {
    const controller = new FindByIdController<User.Entity>(
      this.repositories.users
    );
    return controller.handle(req, res, next);
  }

  @Post()
  post(req: Request, res: Response, next: NextFunction) {
    const controller = new RegisterController<User.Entity>(
      this.repositories.users,
      this.encryptor
    );
    return controller.handle(req, res, next);
  }

  @Put("/:id")
  put(req: Request, res: Response, next: NextFunction) {
    const controller = new UpdateController<User.Entity>(
      this.repositories.users
    );
    return controller.handle(req, res, next);
  }

  @Delete("/:id")
  delete(req: Request, res: Response, next: NextFunction) {
    const controller = new DeleteController<User.Entity>(
      this.repositories.users
    );
    return controller.handle(req, res, next);
  }
}
