import IRepository from "../../output/repositories/repository-interface";
import { EntityName, getEntityBuilder } from "../../utils/entity-builder";

export default function makeCreateUseCaseFn<T>(
  repository: IRepository<T>,
  entityName: EntityName
) {
  return (props: any, id?: string) => {
    const builder = getEntityBuilder(entityName);
    const entity = builder(props, id);

    return repository.save(entity);
  };
}
