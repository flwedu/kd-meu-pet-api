import Animal from "../../domain/entities/animal";
import Occurrence from "../../domain/entities/occurrence";
import User from "../../domain/entities/user";
import IRepository from "./repository-interface";

export default interface IRepositoriesWrapper {
  animals: IRepository<Animal.Entity>;
  users: IRepository<User.Entity>;
  occurrences: IRepository<Occurrence.Entity>;
}
