import { Controller, Get, Post, Put, Delete } from "@overnightjs/core";
import { NextFunction, Request, Response } from "express";
import Animal from "../../domain/entities/animal";
import IRepositoriesWrapper from "../../output/repositories/repositories-wrapper-interface";
import IEncryptor from "../../security/encryptor-interface";
import {
  DeleteController,
  FindByIdController,
  RegisterController,
  UpdateController,
} from "../controllers-factory";

@Controller("/api/animals")
export class AnimalsControllers {
  constructor(
    private repositories: IRepositoriesWrapper,
    private encryptor: IEncryptor
  ) {}

  @Get("/:id")
  get(req: Request, res: Response, next: NextFunction) {
    const controller = new FindByIdController<Animal.Entity>(
      this.repositories.animals
    );
    return controller.handle(req, res, next);
  }

  @Post()
  post(req: Request, res: Response, next: NextFunction) {
    const controller = new RegisterController<Animal.Entity>(
      this.repositories.animals,
      this.encryptor
    );
    return controller.handle(req, res, next);
  }

  @Put("/:id")
  put(req: Request, res: Response, next: NextFunction) {
    const controller = new UpdateController<Animal.Entity>(
      this.repositories.animals
    );
    return controller.handle(req, res, next);
  }

  @Delete("/:id")
  delete(req: Request, res: Response, next: NextFunction) {
    const controller = new DeleteController<Animal.Entity>(
      this.repositories.animals
    );
    return controller.handle(req, res, next);
  }
}
