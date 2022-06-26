import Animal from "../../../domain/entities/animal";
import IRepository from "../repository-interface";
import InMemoryBaseRepository from "./in-memory-base-repository";

export default class AnimalsRepositoryInMemory
  implements IRepository<Animal.Entity>
{
  private base = new InMemoryBaseRepository<Animal.Entity>();

  findAll(): Promise<Animal.Entity[]> {
    return this.base.findAll();
  }
  save(entity: Animal.Entity): Promise<string> {
    return this.base.save(entity);
  }

  findOne(query: object): Promise<Animal.Entity> {
    return this.base.findOne(query);
  }
  findById(id: string): Promise<Animal.Entity> {
    return this.base.findById(id);
  }
  update(entity: Animal.Entity, id: string): Promise<string> {
    return this.base.update(entity, id);
  }
  _delete(id: string): Promise<boolean> {
    return this.base._delete(id);
  }
}
