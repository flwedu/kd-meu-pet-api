import {
  AnimalsRepositoryInMemory,
  OccurrencesRepositoryInMemory,
  UsersRepositoryInMemory,
} from "../output/repositories/in-memory";

export function getInMemoryRepositories() {
  return {
    users: new UsersRepositoryInMemory(),
    animals: new AnimalsRepositoryInMemory(),
    occurrences: new OccurrencesRepositoryInMemory(),
  };
}
