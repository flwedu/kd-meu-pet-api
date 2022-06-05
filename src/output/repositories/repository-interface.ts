interface IRepository<T> {
  findAll(): Promise<T[]>;
  save(entity: T): Promise<string>;
  findById(id: string): Promise<T>;
  update(entity: T, id: string): Promise<string>;
  delete(id: string): Promise<boolean>;
}

export default IRepository;
