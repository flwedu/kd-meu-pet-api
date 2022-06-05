import { Request, Response } from "express";
import { makeFindByIdUseCase } from "../../domain/use-cases/find-by-id-use-case";
import IRepository from "../../output/repositories/repository-interface";

function makeFindByIdController<T>(repository: IRepository<T>) {
  return async (req: Request, res: Response) => {
    const id = req.params.id;
    const findByIdUseCase = makeFindByIdUseCase<T>(repository);
    try {
      const result = await findByIdUseCase(id);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(404).send(error.message);
    }
  };
}

export { makeFindByIdController };
