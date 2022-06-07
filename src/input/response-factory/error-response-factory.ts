import { Response } from "express";

export function createErrorResponse(error: Error, res: Response) {
  const errorDict = {
    ValidationError: () =>
      res.status(400).json({
        type: error.name,
        message: error.message,
      }),
    NotFoundError: () =>
      res.status(404).json({
        type: error.name,
        message: error.message,
      }),
    default: () =>
      res.status(500).json({
        type: error.name,
        message: error.message,
        stack: error.stack,
      }),
  };

  return errorDict[error.name] ? errorDict[error.name]() : errorDict.default();
}
