import Animal from "../domain/entities/animal";
import Occurrence from "../domain/entities/occurrence";
import User from "../domain/entities/user";

export type EntityName = "users" | "animals" | "occurrences";

export function getEntityBuilder(entityName: string) {
  const notWordRegex = /\W/g;
  const name = entityName.replace(notWordRegex, "");

  const factories: Record<string, Function> = {
    users: (props: User.Props, id?: string) => new User.Entity(props, id),
    animals: (props: Animal.Props, id?: string) => new Animal.Entity(props, id),
    occurrences: (props: Occurrence.Props, id?: string) =>
      new Occurrence.Entity(props, id),
  };
  return factories[name];
}
