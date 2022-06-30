import DatabaseError from "../../../domain/errors/database-error";
import NotFoundError from "../../../domain/errors/not-found";
import IRepository from "../repository-interface";

type Entity = {
  id: string;
  props: object;
};
export default class InMemoryBaseRepository<T extends Entity>
  implements IRepository<T>
{
  private list: T[] = [];

  async findAll(): Promise<T[]> {
    return Promise.resolve(this.list);
  }

  async findOne(query: Partial<T>): Promise<T> {
    const found = this.list.find((el: T & { props: any }) => {
      for (const key in query) {
        return query[key] == el.props[key];
      }
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
    const index = this.findIndexById(id);

    return Promise.resolve(this.list[index]);
  }
  async update(entity: T, id: string): Promise<string> {
    const index = this.findIndexById(id);

    this.list[index] = entity;
    return Promise.resolve(entity.id);
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

  private findIndexById(id: string): number {
    const index = this.list.findIndex((el: T) => el.id == id);

    if (index >= 0) return index;
    throw new NotFoundError();
  }
}
