import {
  AnimalsRepositoryInMemory,
  OccurencesRepositoryInMemory,
  UsersRepositoryInMemory,
} from "../output/repositories/in-memory";

export function getInMemoryRepositories() {
  return {
    users: new UsersRepositoryInMemory(),
    animals: new AnimalsRepositoryInMemory(),
    occurences: new OccurencesRepositoryInMemory(),
  };
}
