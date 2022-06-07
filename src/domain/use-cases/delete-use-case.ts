import IRepository from "../../output/repositories/repository-interface";

export function makeDeleteUseCase<T>(repository: IRepository<T>) {
  return (id: string) => {
    return repository.delete(id);
  };
}
