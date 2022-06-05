import Occurence from "../../../domain/entities/occurence";
import IRepository from "../repository-interface";
import InMemoryBaseRepository from "./in-memory-base-repository";

class OccurencesRepositoryInMemory implements IRepository<Occurence.Entity> {
  private base = new InMemoryBaseRepository<Occurence.Entity>();

  findAll() {
    return this.base.findAll();
  }

  save(entity: Occurence.Entity): Promise<string> {
    return this.base.save(entity);
  }
  findById(id: string): Promise<Occurence.Entity> {
    return this.base.findById(id);
  }
  update(entity: Occurence.Entity, id: string): Promise<string> {
    return this.base.update(entity, id);
  }
  delete(id: string): Promise<boolean> {
    return this.base.delete(id);
  }
}

export default OccurencesRepositoryInMemory;
