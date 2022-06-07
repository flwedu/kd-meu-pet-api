import IRepository from "../../output/repositories/repository-interface";

export default function makeDeleteUseCase<T>(repository: IRepository<T>) {
  return (id: string) => {
    return repository.delete(id);
  };
}
