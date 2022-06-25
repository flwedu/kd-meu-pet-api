import { Response } from "express";

export const createErrorResponse = (error: Error, res: Response) => {
  const errorDict: Record<string, Function> = {
    ValidationError: () =>
      res.status(400).json({
        type: error.name,
        message: error.message,
      }),
    AuthenticationError: () => {
      res.status(401).json({
        type: error.name,
        message: error.message,
      });
    },
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

  return errorDict[error.name] || errorDict.default;
};
