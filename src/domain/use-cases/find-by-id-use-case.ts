import IRepository from "../../output/repositories/repository-interface";

export default function makeFindByIdUseCase<T>(repository: IRepository<T>) {
  return (id: string) => repository.findById(id);
}
