import { Request, Response } from "express";
import { createErrorResponse } from "../../response-factory/error-response-factory";
import { createSuccessResponse } from "../../response-factory/success-response-factory";
import { LoginSession } from "./session";

export function makeLogoutController() {
  return async (req: Request, res: Response) => {
    try {
      const session = req.session as LoginSession;
      session.destroy();
      return createSuccessResponse(res).ok({ message: "Logout successful" });
    } catch (error) {
      return createErrorResponse(error, res);
    }
  };
}
