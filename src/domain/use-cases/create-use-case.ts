import IRepository from "../../output/repositories/repository-interface";
import Animal from "../entities/animal";
import Occurrence from "../entities/occurrence";
import User from "../entities/user";

export default function makeCreateUseCaseFn<T>(
  repository: IRepository<T>,
  entityName: "users" | "animals" | "occurrences"
) {
  return async (props: any) => {
    const createFn = getEntityFactory(entityName);
    const entity = createFn(props);

    //@ts-ignore
    return repository.save(entity);
  };
}

function getEntityFactory(entityName: "users" | "animals" | "occurrences") {
  const factories = {
    users: (props: User.Props) => new User.Entity(props),
    animals: (props: Animal.Props) => new Animal.Entity(props),
    occurrences: (props: Occurrence.Props) => new Occurrence.Entity(props),
  };
  return factories[entityName];
}
