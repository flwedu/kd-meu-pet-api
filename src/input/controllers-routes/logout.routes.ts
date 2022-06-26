import { ClassErrorMiddleware, Controller, Get, Post } from "@overnightjs/core";
import { NextFunction, Request, Response } from "express";
import { LoginSession } from "./session";
import { createSuccessResponse } from "../response-factory/success-response-factory";
import { catchError } from "../middlewares/catch-error";

@Controller("api/logout")
@ClassErrorMiddleware(catchError)
export class LogoutController {
  @Get()
  @Post()
  action(req: Request, res: Response, next: NextFunction) {
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
