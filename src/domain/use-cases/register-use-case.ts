import IRepository from "../../output/repositories/repository-interface";
import IEncryptor from "../../security/encryptor-interface";
import { getEntityBuilder } from "../../utils/entity-builder";
import { EntityNames } from "../entities";

export default class RegisterUseCase<T> {
  constructor(
    private repository: IRepository<T>,
    private entityName: EntityNames,
    private encryptor: IEncryptor
  ) {}
  execute(props: any, id?: string) {
    const builder = getEntityBuilder(this.entityName);
    const entity = builder(props, id);

    if (entity.props.password)
      entity.props.password = this.encryptor.encrypt(props.password);

    return this.repository.save(entity);
  }
}
