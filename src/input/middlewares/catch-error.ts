import { NextFunction, Request, Response } from "express";
import { createErrorResponse } from "../response-factory/error-response-factory";

export const catchError = (
  error: Error,
  _: Request,
  res: Response,
  next: NextFunction
) => {
  const devMode = process.env.NODE_ENV === "development";
  if (error) {
    const errorResponse = createErrorResponse(error, res, devMode);
    return errorResponse();
  }

  return next();
};
