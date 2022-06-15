import { Request, Response } from "express";
import { createErrorResponse } from "../../response-factory/error-response-factory";
import { createSuccessResponse } from "../../response-factory/success-response-factory";
import { LoginSession } from "./session";

export function makeLogoutController() {
  return async (req: Request, res: Response) => {
    const session = req.session as LoginSession;
    session.destroy((err: any) => {
      if (err) return createErrorResponse(err, res);
      return createSuccessResponse(res).ok({ message: "Logout successful" });
    });
  };
}
