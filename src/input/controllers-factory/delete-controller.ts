import { Request, Response } from "express";
import { OperationError } from "../../domain/errors/operation-error";
import ValidationError from "../../domain/errors/validation-error";
import { DeleteUseCase } from "../../domain/use-cases";

import IRepository from "../../output/repositories/repository-interface";
import { createSuccessResponse } from "../response-factory/success-response-factory";
import { IController } from "./controller-interface";

export class DeleteController<T> implements IController {
  constructor(private repository: IRepository<T>) {}

  async handle(req: Partial<Request>, res: Response, next: any) {
    const id = req.params?.id;

    try {
      if (!id) throw new ValidationError("Id", "Not provided");

      const useCase = new DeleteUseCase<T>(this.repository);
      const result = await useCase.execute(id);

      if (result) return createSuccessResponse(res).deleted(id);
      throw new OperationError("Error when deleting");
    } catch (error) {
      next(error);
    }
  }
}
