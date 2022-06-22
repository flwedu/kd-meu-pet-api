import { ClassErrorMiddleware, Controller, Get, Post } from "@overnightjs/core";
import { NextFunction, Request, Response } from "express";
import { LoginUserUseCase } from "../../domain/use-cases/user/login-user-use-case";
import IRepositoriesWrapper from "../../output/repositories/repositories-wrapper-interface";
import IEncryptor from "../../security/encryptor-interface";
import { LoginSession } from "./session";
import { createSuccessResponse } from "../response-factory/success-response-factory";
import { catchError } from "../middlewares/catch-error";

@Controller("api/login")
@ClassErrorMiddleware(catchError)
export class LoginController {
  constructor(
    private readonly repositories: IRepositoriesWrapper,
    private readonly encryptor: IEncryptor
  ) {}

  @Get()
  get(req: Request, res: Response, next: NextFunction) {
    return res.status(200).json({ message: "This is the login route" });
  }

  @Post()
  async post(req: Request, res: Response, next: NextFunction) {
    try {
      const session = req.session as LoginSession;
      const { username, password } = req.body;
      const loginUseCase = new LoginUserUseCase(
        this.repositories.users,
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
