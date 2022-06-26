import { Request, Response } from "express";
import ValidationError from "../../domain/errors/validation-error";
import { UpdateUseCase } from "../../domain/use-cases";
import IRepository from "../../output/repositories/repository-interface";
import { EntityName } from "../../utils/entity-builder";
import { createSuccessResponse } from "../response-factory/success-response-factory";
import { IController } from "./controller-interface";

export class UpdateController<T> implements IController {
  constructor(private repository: IRepository<T>) {}

  async handle(req: Partial<Request>, res: Response, next: any) {
    const entityName = req.path as EntityName;
    const props = req.body;
    const id = req.params?.id;

    const useCase = new UpdateUseCase<T>(this.repository, entityName);

    try {
      if (!id) throw new ValidationError("Id", "Not provided");

      await useCase.execute(props, id);
      return createSuccessResponse(res);
    } catch (error) {
      next(error);
    }
  }
}
