import Occurrence from "../../../domain/entities/occurrence";
import IRepository from "../repository-interface";
import InMemoryBaseRepository from "./in-memory-base-repository";

export default class OccurrencesRepositoryInMemory
  implements IRepository<Occurrence.Entity>
{
  private base = new InMemoryBaseRepository<Occurrence.Entity>();

  findAll() {
    return this.base.findAll();
  }

  save(entity: Occurrence.Entity): Promise<string> {
    return this.base.save(entity);
  }
  findById(id: string): Promise<Occurrence.Entity> {
    return this.base.findById(id);
  }
  findOne(query: object): Promise<Occurrence.Entity> {
    return this.base.findOne(query);
  }

  update(entity: Occurrence.Entity, id: string): Promise<string> {
    return this.base.update(entity, id);
  }
  delete(id: string): Promise<boolean> {
    return this.base.delete(id);
  }
}
