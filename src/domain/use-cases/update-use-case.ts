import IRepository from "../../output/repositories/repository-interface";
import { getEntityBuilder } from "../../utils/entity-builder";

export default function makeUpdateUseCaseFn<T>(
  repository: IRepository<T>,
  entityName: "users" | "animals" | "occurrences"
) {
  return (props: any, id: string) => {
    const builder = getEntityBuilder(entityName);
    const updated = builder(props, id);
    return repository.update(updated, id);
  };
}
