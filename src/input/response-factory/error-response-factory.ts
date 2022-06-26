import { Response } from "express";

export const createErrorResponse = (
  error: Error,
  res: Response,
  devMode?: boolean
) => {
  const errorRecords: Record<string, Function> = {
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
  if (devMode)
    console.error(`Error Caught in middleware:
  Name: ${error.name} 
  Message: ${error.message}
  Stack: ${error.stack}`);

  return errorRecords[error.name] ?? errorRecords.default;
};
