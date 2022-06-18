import { Request, Response } from "express";
import { makeFindByIdUseCase } from "../../domain/use-cases";
import IRepository from "../../output/repositories/repository-interface";
import { createErrorResponse } from "../response-factory/error-response-factory";
import { createSuccessResponse } from "../response-factory/success-response-factory";
import { IController } from "./controller-interface";

export class FindByIdController<T> implements IController {
  constructor(private repository: IRepository<T>) {}

  async handle(req: Request, res: Response) {
    const id = req.params.id;
    const findByIdUseCase = makeFindByIdUseCase<T>(this.repository);
    try {
      const result = await findByIdUseCase(id);
      return createSuccessResponse(res).ok(result);
    } catch (error) {
      return createErrorResponse(error, res);
    }
  }
}
