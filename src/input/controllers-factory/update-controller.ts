import { Request, Response } from "express";
import ValidationError from "../../domain/errors/validation-error";
import { UpdateUseCase } from "../../domain/use-cases";
import IRepository from "../../output/repositories/repository-interface";
import { getNameFromPathOrBaseUrl } from "../../utils/get-name-from-path-or-baseurl";
import { createSuccessResponse } from "../response-factory/success-response-factory";
import { IController } from "./controller-interface";

export class UpdateController<T> implements IController {
  constructor(private repository: IRepository<T>) {}

  async handle(req: Partial<Request>, res: Response, next: any) {
    const entityName = getNameFromPathOrBaseUrl(req);
    const props = req.body;
    const id = req.params?.id;

    const useCase = new UpdateUseCase<T>(this.repository, entityName);

    try {
      if (!id) throw new ValidationError("Id", "Not provided");

      const response = await useCase.execute(props, id);
      return createSuccessResponse(res).ok(response);
    } catch (error) {
      next(error);
    }
  }
}
