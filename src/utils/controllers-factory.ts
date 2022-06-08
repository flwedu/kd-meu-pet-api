import {
  makeDeleteController,
  makeFindByIdController,
  makeRegisterController,
  makeUpdateController,
} from "../input/controllers";
import IRepository from "../output/repositories/repository-interface";

export function makeControllers<T>(repository: IRepository<T>) {
  const findByIdController = makeFindByIdController<T>(repository);
  const registerController = makeRegisterController<T>(repository);
  const deleteController = makeDeleteController<T>(repository);
  const updateController = makeUpdateController<T>(repository);

  return {
    findByIdController,
    registerController,
    updateController,
    deleteController,
  };
}
