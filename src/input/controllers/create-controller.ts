import { Request, Response } from "express";
import { makeCreateUseCaseFn } from "../../domain/use-cases";
import IRepository from "../../output/repositories/repository-interface";
import { createErrorResponse } from "../response-factory/error-response-factory";

export function makeCreateController<T>(repository: IRepository<T>) {
  return async (req: Request, res: Response) => {
    const entityName = req.path;
    const props = req.body;

    const createUseCase = makeCreateUseCaseFn<T>(
      repository,
      //@ts-ignore
      entityName
    );

    try {
      const id = await createUseCase(props);
      return res.status(201).json({ created: id });
    } catch (error) {
      return createErrorResponse(error, res);
    }
  };
}
