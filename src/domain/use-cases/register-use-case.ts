import IRepository from "../../output/repositories/repository-interface";
import IEncryptor from "../../security/encryptor-interface";
import { EntityName, getEntityBuilder } from "../../utils/entity-builder";

export default class RegisterUseCase<T> {
  constructor(
    private repository: IRepository<T>,
    private entityName: EntityName,
    private encryptor: IEncryptor
  ) {}
  execute(props: any, id?: string) {
    const builder = getEntityBuilder(this.entityName);
    const entity = builder(props, id);

    if (entity.password)
      entity.password = this.encryptor.encrypt(entity.password);

    return this.repository.save(entity);
  }
}
