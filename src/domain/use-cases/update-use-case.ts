import IRepository from "../../output/repositories/repository-interface";
import { EntityName, getEntityBuilder } from "../../utils/entity-builder";

export default function makeUpdateUseCaseFn<T>(
  repository: IRepository<T>,
  entityName: EntityName
) {
  return (props: any, id: string) => {
    const builder = getEntityBuilder(entityName);
    const updated = builder(props, id);
    return repository.update(updated, id);
  };
}
