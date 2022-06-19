import { Request, Response } from "express";
import { DeleteUseCase } from "../../domain/use-cases";

import IRepository from "../../output/repositories/repository-interface";
import { createSuccessResponse } from "../response-factory/success-response-factory";
import { IController } from "./controller-interface";

export class DeleteController<T> implements IController {
  constructor(private repository: IRepository<T>) {}

  async handle(req: Request, res: Response, next: any) {
    const id = req.params.id;

    try {
      const useCase = new DeleteUseCase<T>(this.repository);
      const result = await useCase.execute(id);

      if (result) return createSuccessResponse(res).deleted(id);
      throw new Error("Error deleting");
    } catch (error) {
      next(error);
    }
  }
}
