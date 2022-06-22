import IRepository from "../../output/repositories/repository-interface";

export default class FindByIdUseCase<T> {
  constructor(private repository: IRepository<T>) {}

  execute(id: string) {
    return this.repository.findById(id);
  }
}
