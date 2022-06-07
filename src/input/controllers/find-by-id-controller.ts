import { Request, Response } from "express";
import { makeFindByIdUseCase } from "../../domain/use-cases";
import IRepository from "../../output/repositories/repository-interface";
import { createErrorResponse } from "../response-factory/error-response-factory";

export function makeFindByIdController<T>(repository: IRepository<T>) {
  return async (req: Request, res: Response) => {
    const id = req.params.id;
    const findByIdUseCase = makeFindByIdUseCase<T>(repository);
    try {
      const result = await findByIdUseCase(id);
      return res.status(200).json(result);
    } catch (error) {
      return createErrorResponse(error, res);
    }
  };
}
