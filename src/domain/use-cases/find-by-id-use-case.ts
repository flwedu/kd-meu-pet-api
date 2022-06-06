import IRepository from "../../output/repositories/repository-interface";

function makeFindByIdUseCase<T>(repository: IRepository<T>) {
  return async (id: string) => repository.findById(id);
}

export default makeFindByIdUseCase;
