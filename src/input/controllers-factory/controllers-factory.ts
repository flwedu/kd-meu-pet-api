import {
  DeleteController,
  FindByIdController,
  RegisterController,
  UpdateController,
} from ".";
import IRepository from "../../output/repositories/repository-interface";
import IEncryptor from "../../security/encryptor-interface";

export class ControllersFactory<T> {
  private findByIdController: FindByIdController<T>;
  private registerController: RegisterController<T>;
  private deleteController: DeleteController<T>;
  private updateController: UpdateController<T>;

  constructor(repository: IRepository<T>, encryptor: IEncryptor) {
    this.findByIdController = new FindByIdController<T>(repository);
    this.registerController = new RegisterController<T>(repository, encryptor);
    this.deleteController = new DeleteController<T>(repository);
    this.updateController = new UpdateController<T>(repository);
  }

  public getControllers = () => {
    return {
      findById: this.findByIdController,
      register: this.registerController,
      _delete: this.deleteController,
      update: this.updateController,
    };
  };
}
