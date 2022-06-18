import IRepositoriesWrapper from "../repositories-wrapper-interface";
import AnimalsRepositoryInMemory from "./animals-repository-in-memory";
import OccurrencesRepositoryInMemory from "./occurrences-repository-in-memory";
import UsersRepositoryInMemory from "./users-repository-in-memory";

export default function makeInMemoryRepositoryWrapper(): IRepositoriesWrapper {
  const animals = new AnimalsRepositoryInMemory();
  const users = new UsersRepositoryInMemory();
  const occurrences = new OccurrencesRepositoryInMemory();

  return {
    animals,
    users,
    occurrences,
  };
}
