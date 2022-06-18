import { Request, Response } from "express";
import { makeRegisterUseCaseFn } from "../../domain/use-cases";
import IRepository from "../../output/repositories/repository-interface";
import IEncryptor from "../../security/encryptor-interface";
import { EntityName } from "../../utils/entity-builder";
import { createErrorResponse } from "../response-factory/error-response-factory";
import { createSuccessResponse } from "../response-factory/success-response-factory";
import { IController } from "./controller-interface";

export class RegisterController<T> implements IController {
  constructor(
    private repository: IRepository<T>,
    private encryptor: IEncryptor
  ) {}

  async handle(req: Request, res: Response) {
    const entityName = req.path;
    const props = req.body;

    const registerUseCase = makeRegisterUseCaseFn<T>(
      this.repository,
      entityName as EntityName,
      this.encryptor
    );

    try {
      const id = props.id;
      const createdId = await registerUseCase(props, id);
      return createSuccessResponse(res).created(createdId);
    } catch (error) {
      return createErrorResponse(error, res);
    }
  }
}
