import { NextFunction, Request, Response } from "express";
import { createErrorResponse } from "../response-factory/error-response-factory";

export const catchError = (
  error: Error,
  _: Request,
  res: Response,
  next: NextFunction
) => {
  if (error) {
    const errorResponse = createErrorResponse(error, res);
    return errorResponse();
  }

  return next();
};
