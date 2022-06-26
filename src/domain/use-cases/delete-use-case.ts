import IRepository from "../../output/repositories/repository-interface";

export default class DeleteUseCase<T> {
  constructor(private repository: IRepository<T>) {}
  execute(id: string) {
    return this.repository._delete(id);
  }
}
