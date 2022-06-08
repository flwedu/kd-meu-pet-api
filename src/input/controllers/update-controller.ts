import { Request, Response } from "express";
import { makeUpdateUseCaseFn } from "../../domain/use-cases";
import IRepository from "../../output/repositories/repository-interface";
import { createErrorResponse } from "../response-factory/error-response-factory";
import { createSuccessResponse } from "../response-factory/success-response-factory";

export function makeUpdateController<T>(repository: IRepository<T>) {
  return async (req: Request, res: Response) => {
    const entityName = req.path;
    const props = req.body;
    const id = req.params.id;

    const updateUseCase = makeUpdateUseCaseFn<T>(
      repository,
      //@ts-ignore
      entityName
    );

    try {
      await updateUseCase(props, id);
      return createSuccessResponse(res);
    } catch (error) {
      return createErrorResponse(error, res);
    }
  };
}
