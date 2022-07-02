import User from "./user";
import Animal from "./animal";
import Occurrence from "./occurrence";

type EntityTypes = {
  users: User.Entity;
  animals: Animal.Entity;
  occurrences: Occurrence.Entity;
};

type EntityProps = {
  users: User.Props;
  animals: Animal.Props;
  occurrences: Occurrence.Props;
};

type EntityNames = keyof EntityTypes;

export { User, Animal, Occurrence, EntityTypes, EntityProps, EntityNames };
