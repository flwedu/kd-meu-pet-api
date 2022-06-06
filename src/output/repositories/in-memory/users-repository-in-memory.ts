import User from "../../../domain/entities/user";
import InMemoryBaseRepository from "../in-memory/in-memory-base-repository";
import IRepository from "../repository-interface";

export default class UsersRepositoryInMemory
  implements IRepository<User.Entity>
{
  private base = new InMemoryBaseRepository<User.Entity>();

  findAll() {
    return this.base.findAll();
  }

  save(entity: User.Entity): Promise<string> {
    return this.base.save(entity);
  }
  findById(id: string): Promise<User.Entity> {
    return this.base.findById(id);
  }
  update(entity: User.Entity, id: string): Promise<string> {
    return this.base.update(entity, id);
  }
  delete(id: string): Promise<boolean> {
    return this.base.delete(id);
  }
}
