import { Request, Response } from "express";
import { FindByIdUseCase } from "../../domain/use-cases";
import IRepository from "../../output/repositories/repository-interface";
import { createSuccessResponse } from "../response-factory/success-response-factory";
import { IController } from "./controller-interface";

export class FindByIdController<T> implements IController {
  constructor(private repository: IRepository<T>) {}

  async handle(req: Request, res: Response, next: any) {
    const id = req.params.id;
    const useCase = new FindByIdUseCase<T>(this.repository);
    try {
      const result = await useCase.execute(id);
      return createSuccessResponse(res).ok(result);
    } catch (error) {
      next(error);
    }
  }
}
