import { NextFunction, Request, Response } from "express";
import { createErrorResponse } from "../response-factory/error-response-factory";

export function catchError(
  error: any,
  _: Request,
  res: Response,
  next: NextFunction
) {
  if (error) {
    return createErrorResponse(error, res);
  }

  next();
}
