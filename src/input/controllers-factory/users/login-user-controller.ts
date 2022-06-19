import { NextFunction, Request, Response } from "express";
import User from "../../../domain/entities/user";
import { LoginUserUseCase } from "../../../domain/use-cases/user/login-user-use-case";
import IRepository from "../../../output/repositories/repository-interface";
import IEncryptor from "../../../security/encryptor-interface";
import { createSuccessResponse } from "../../response-factory/success-response-factory";
import { IController } from "../controller-interface";
import { LoginSession } from "./session";

export class LoginUserController implements IController {
  constructor(
    private repository: IRepository<User.Entity>,
    private encryptor: IEncryptor
  ) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const session = req.session as LoginSession;
      const { username, password } = req.body;
      const loginUseCase = new LoginUserUseCase(
        this.repository,
        this.encryptor
      );
      const user = await loginUseCase.execute({ username, password });

      if (user) {
        session.loggedId = user.id;
        return createSuccessResponse(res).ok({ message: "Login successful" });
      }
    } catch (error) {
      next(error);
    }
  }
}
