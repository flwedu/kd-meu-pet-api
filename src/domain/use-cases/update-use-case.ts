import IRepository from "../../output/repositories/repository-interface";
import { getEntityBuilder } from "../../utils/entity-builder";
import { EntityNames } from "../entities";

export default class UpdateUseCaseFn<T> {
  constructor(
    private repository: IRepository<T>,
    private entityName: EntityNames
  ) {}

  execute(props: any, id: string) {
    const builder = getEntityBuilder(this.entityName);
    const updated = builder(props, id);
    return this.repository.update(updated, id);
  }
}
