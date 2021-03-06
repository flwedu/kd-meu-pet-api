import { Request, Response } from "express";
import ValidationError from "../../domain/errors/validation-error";
import { FindByIdUseCase } from "../../domain/use-cases";
import IRepository from "../../output/repositories/repository-interface";
import { createSuccessResponse } from "../response-factory/success-response-factory";
import { IController } from "./controller-interface";

export class FindByIdController<T> implements IController {
  constructor(private repository: IRepository<T>) {}

  async handle(req: Partial<Request>, res: Response, next: any) {
    const id = req.params?.id;
    const useCase = new FindByIdUseCase<T>(this.repository);
    try {
      if (!id) throw new ValidationError("Id", "Not provided");

      const result = await useCase.execute(id);
      return createSuccessResponse(res).ok(result);
    } catch (error) {
      next(error);
    }
  }
}
