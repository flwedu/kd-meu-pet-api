import Animal from "../domain/entities/animal";
import Occurrence from "../domain/entities/occurrence";
import User from "../domain/entities/user";

export type EntityName = "users" | "animals" | "occurrences";

export function getEntityBuilder(entityName: string) {
  const notWordRegex = /\W/g;
  const name = entityName.replace(notWordRegex, "");

  const factories = {
    users: (props: User.Props) => new User.Entity(props),
    animals: (props: Animal.Props) => new Animal.Entity(props),
    occurrences: (props: Occurrence.Props) => new Occurrence.Entity(props),
  };
  return factories[name];
}
