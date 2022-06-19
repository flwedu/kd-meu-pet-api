import {
  AnimalsRepositoryInMemory,
  OccurrencesRepositoryInMemory,
  UsersRepositoryInMemory,
} from "../output/repositories/in-memory";

const getInMemoryRepositories = () => {
  return {
    users: new UsersRepositoryInMemory(),
    animals: new AnimalsRepositoryInMemory(),
    occurrences: new OccurrencesRepositoryInMemory(),
  };
};

export default getInMemoryRepositories;
