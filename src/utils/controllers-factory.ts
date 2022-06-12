import {
  makeDeleteController,
  makeFindByIdController,
  makeRegisterController,
  makeUpdateController,
} from "../input/controllers";
import IRepository from "../output/repositories/repository-interface";
import IEncryptor from "../security/encryptor-interface";

export function makeControllers<T>(
  repository: IRepository<T>,
  encryptor?: IEncryptor
) {
  const findByIdController = makeFindByIdController<T>(repository);
  const registerController = makeRegisterController<T>(repository, encryptor);
  const deleteController = makeDeleteController<T>(repository);
  const updateController = makeUpdateController<T>(repository);

  return {
    findByIdController,
    registerController,
    updateController,
    deleteController,
  };
}
