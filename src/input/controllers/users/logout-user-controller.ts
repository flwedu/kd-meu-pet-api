import { Request, Response } from "express";
import { createErrorResponse } from "../../response-factory/error-response-factory";
import { createSuccessResponse } from "../../response-factory/success-response-factory";
import { IController } from "../controller-interface";
import { LoginSession } from "./session";

export class LogoutController implements IController {
  async handle(req: Request, res: Response) {
    const session = req.session as LoginSession;
    session.destroy((err: any) => {
      if (err) return createErrorResponse(err, res);
      return createSuccessResponse(res).ok({ message: "Logout successful" });
    });
  }
}
