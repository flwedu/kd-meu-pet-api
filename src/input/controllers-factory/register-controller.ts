import { Request, Response } from "express";
import { OperationError } from "../../domain/errors/operation-error";
import { RegisterUseCase } from "../../domain/use-cases";
import IRepository from "../../output/repositories/repository-interface";
import IEncryptor from "../../security/encryptor-interface";
import { EntityName } from "../../utils/entity-builder";
import { createSuccessResponse } from "../response-factory/success-response-factory";
import { IController } from "./controller-interface";

export class RegisterController<T> implements IController {
  constructor(
    private readonly repository: IRepository<T>,
    private readonly encryptor: IEncryptor
  ) {}

  async handle(req: Request, res: Response, next: any) {
    const path = req.path.length > 1 ? req.path : req.baseUrl;
    const entityName = extractEntityNameFromPath(path);
    const props = req.body;

    const useCase = new RegisterUseCase<T>(
      this.repository,
      entityName as EntityName,
      this.encryptor
    );

    try {
      const id = props.id;
      const createdId = await useCase.execute(props, id);
      return createSuccessResponse(res).created(createdId);
    } catch (error) {
      next(error);
    }
  }
}

function extractEntityNameFromPath(path: string) {
  const findPathRegex = /api\/(\w+)\/?/gi;
  const matchResults = findPathRegex.exec(path);
  if (!matchResults) {
    throw new OperationError(
      `Could not extract entity name from path: ${path}`
    );
  }
  return matchResults[1];
}
