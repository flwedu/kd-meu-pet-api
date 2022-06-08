import { Request, Response } from "express";
import { makeDeleteUseCase } from "../../domain/use-cases";
import IRepository from "../../output/repositories/repository-interface";
import { createErrorResponse } from "../response-factory/error-response-factory";
import { createSuccessResponse } from "../response-factory/success-response-factory";

export function makeDeleteController<T>(repository: IRepository<T>) {
  return async (req: Request, res: Response) => {
    const id = req.params.id;

    try {
      const useCase = makeDeleteUseCase<T>(repository);
      const result = await useCase(id);

      if (result) return createSuccessResponse(res).deleted(id);
      throw new Error("Error deleting");
    } catch (error) {
      return createErrorResponse(error, res);
    }
  };
}
