import { Request, Response } from "express";
import { RegisterUseCase } from "../../domain/use-cases";
import IRepository from "../../output/repositories/repository-interface";
import IEncryptor from "../../security/encryptor-interface";
import { getNameFromPathOrBaseUrl } from "../../utils/get-name-from-path-or-baseurl";
import { createSuccessResponse } from "../response-factory/success-response-factory";
import { IController } from "./controller-interface";

export class RegisterController<T> implements IController {
  constructor(
    private readonly repository: IRepository<T>,
    private readonly encryptor: IEncryptor
  ) {}

  async handle(req: Partial<Request>, res: Response, next: any) {
    const entityName = getNameFromPathOrBaseUrl(req);
    const props = req.body;

    const useCase = new RegisterUseCase<T>(
      this.repository,
      entityName,
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
