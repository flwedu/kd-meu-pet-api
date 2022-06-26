export default interface IRepository<T> {
  findAll(): Promise<T[]>;
  save(entity: T): Promise<string>;
  findById(id: string): Promise<T>;
  findOne(query: object): Promise<T>;
  update(entity: T, id: string): Promise<string>;
  _delete(id: string): Promise<boolean>;
}
