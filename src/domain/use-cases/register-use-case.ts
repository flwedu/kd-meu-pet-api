import IRepository from "../../output/repositories/repository-interface";
import IEncryptor from "../../security/encryptor-interface";
import { EntityName, getEntityBuilder } from "../../utils/entity-builder";

export default function makeRegisterUseCaseFn<T>(
  repository: IRepository<T>,
  entityName: EntityName,
  encryptor: IEncryptor
) {
  return (props: any, id?: string) => {
    const builder = getEntityBuilder(entityName);
    const entity = builder(props, id);

    if (entity.password) entity.password = encryptor.encrypt(entity.password);

    return repository.save(entity);
  };
}
