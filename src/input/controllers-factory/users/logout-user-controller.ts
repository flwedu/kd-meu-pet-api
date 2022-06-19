import { Request, Response } from "express";
import { createSuccessResponse } from "../../response-factory/success-response-factory";
import { IController } from "../controller-interface";
import { LoginSession } from "./session";

export class LogoutController implements IController {
  async handle(req: Request, res: Response, next: any) {
    try {
      const session = req.session as LoginSession;
      session.destroy((error: any) => {
        if (error) throw error;
        return createSuccessResponse(res).ok({ message: "Logout successful" });
      });
    } catch (error) {
      next(error);
    }
  }
}
