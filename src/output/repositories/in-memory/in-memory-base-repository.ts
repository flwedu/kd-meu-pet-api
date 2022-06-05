class InMemoryBaseRepository<T extends { id: string }> {
  private list: T[] = [];
  constructor() {}

  findAll(): Promise<T[]> {
    return Promise.resolve(this.list);
  }

  save(entity: T): Promise<string> {
    const oldLength = this.list.length;
    this.list.push(entity);
    if (oldLength < this.list.length) {
      return Promise.resolve(entity.id);
    }
    return Promise.reject("Can't save entity");
  }
  findById(id: string): Promise<T> {
    const sameId = (el: T) => el.id == id;
    const find = this.list.find(sameId);

    if (!!find) return Promise.resolve(find);
    return Promise.reject("Not found");
  }
  update(entity: T, id: string): Promise<string> {
    const sameId = (el: T) => el.id == id;
    const entityIndex = this.list.findIndex(sameId);

    if (entityIndex > -1) {
      this.list[entityIndex] = entity;
      return Promise.resolve(entity.id);
    }
    return Promise.reject("Not found");
  }
  delete(id: string): Promise<boolean> {
    const notSameId = (el: T) => el.id !== id;
    const oldLength = this.list.length;
    this.list.filter(notSameId);
    if (oldLength > this.list.length) {
      return Promise.resolve(true);
    }
    return Promise.reject("Can't save entity");
  }
}

export default InMemoryBaseRepository;
