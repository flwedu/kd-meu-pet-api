import IRepository from "../../output/repositories/repository-interface";
import { EntityName, getEntityBuilder } from "../../utils/entity-builder";

export default class UpdateUseCaseFn<T> {
  constructor(
    private repository: IRepository<T>,
    private entityName: EntityName
  ) {}

  execute(props: any, id: string) {
    const builder = getEntityBuilder(this.entityName);
    const updated = builder(props, id);
    return this.repository.update(updated, id);
  }
}
