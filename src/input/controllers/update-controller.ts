import { Request, Response } from "express";
import { makeUpdateUseCaseFn } from "../../domain/use-cases";
import IRepository from "../../output/repositories/repository-interface";
import { EntityName } from "../../utils/entity-builder";
import { createSuccessResponse } from "../response-factory/success-response-factory";

export class UpdateController<T> {
  constructor(private repository: IRepository<T>) {}

  async handle(req: Request, res: Response, next: any) {
    const entityName = req.path as EntityName;
    const props = req.body;
    const id = req.params.id;

    const updateUseCase = makeUpdateUseCaseFn<T>(this.repository, entityName);

    try {
      await updateUseCase(props, id);
      return createSuccessResponse(res);
    } catch (error) {
      next(error);
    }
  }
}
