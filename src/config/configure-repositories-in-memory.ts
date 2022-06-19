import {
  AnimalsRepositoryInMemory,
  OccurrencesRepositoryInMemory,
  UsersRepositoryInMemory,
} from "../output/repositories/in-memory";
import IRepositoriesWrapper from "../output/repositories/repositories-wrapper-interface";

export function getInMemoryRepositories(): IRepositoriesWrapper {
  return {
    users: new UsersRepositoryInMemory(),
    animals: new AnimalsRepositoryInMemory(),
    occurrences: new OccurrencesRepositoryInMemory(),
  };
}
