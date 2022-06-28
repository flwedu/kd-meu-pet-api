import DatabaseError from "../../../domain/errors/database-error";
import NotFoundError from "../../../domain/errors/not-found";
import IRepository from "../repository-interface";

export default class InMemoryBaseRepository<
  T extends { id: string; props: any }
> implements IRepository<T>
{
  private list: T[] = [];
  constructor() {}

  async findAll(): Promise<T[]> {
    return Promise.resolve(this.list);
  }

  async findOne(query: Partial<T>): Promise<T> {
    const found = this.list.find((el: T & { props: any }) => {
      for (const key in query) {
        if (query[key] !== el.props[key]) {
          return false;
        }
      }
      return true;
    });
    if (found) {
      return Promise.resolve(found);
    }
    throw new NotFoundError();
  }

  async save(entity: T): Promise<string> {
    const oldLength = this.list.length;
    this.list.push(entity);
    if (oldLength < this.list.length) {
      return Promise.resolve(entity.id);
    }
    throw new DatabaseError("Could't save entity");
  }
  async findById(id: string): Promise<T> {
    const sameId = (el: T) => el.id == id;
    const find = this.list.find(sameId);

    if (!!find) return Promise.resolve(find);
    throw new NotFoundError();
  }
  async update(entity: T, id: string): Promise<string> {
    const sameId = (el: T) => el.id == id;
    const entityIndex = this.list.findIndex(sameId);

    if (entityIndex > -1) {
      this.list[entityIndex] = entity;
      return Promise.resolve(entity.id);
    }
    throw new NotFoundError();
  }
  async _delete(id: string): Promise<boolean> {
    await this.findById(id);

    const notSameId = (el: T) => el.id != id;
    const oldLength = this.list.length;
    this.list = this.list.filter(notSameId);
    if (this.list.length < oldLength) {
      return Promise.resolve(true);
    }
    throw new DatabaseError("Could't delete entity");
  }
}
