import { NextFunction, Request, Response } from "express";
import User from "../../../domain/entities/user";
import { makeLoginUserUseCase } from "../../../domain/use-cases/user/login-user-use-case";
import IRepository from "../../../output/repositories/repository-interface";
import IEncryptor from "../../../security/encryptor-interface";
import { createSuccessResponse } from "../../response-factory/success-response-factory";
import { LoginSession } from "./session";

export function makeLoginUserController(
  repository: IRepository<User.Entity>,
  encryptor: IEncryptor
) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const session = req.session as LoginSession;
    const { username, password } = req.body;
    const loginUseCase = makeLoginUserUseCase(repository, encryptor);
    const user = await loginUseCase({ username, password });

    if (user) {
      session.loggedId = user.id;
      return createSuccessResponse(res).ok({ message: "Login successful" });
    }
  };
}
