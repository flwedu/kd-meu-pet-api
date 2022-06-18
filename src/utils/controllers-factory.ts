import {
  DeleteController,
  FindByIdController,
  RegisterController,
  UpdateController,
} from "../input/controllers";
import IRepository from "../output/repositories/repository-interface";
import IEncryptor from "../security/encryptor-interface";

export class ControllersFactory<T> {
  private findByIdController: FindByIdController<T>;
  private registerController: RegisterController<T>;
  private deleteController: DeleteController<T>;
  private updateController: UpdateController<T>;

  constructor(
    private repository: IRepository<T>,
    private encryptor?: IEncryptor
  ) {
    this.findByIdController = new FindByIdController<T>(this.repository);
    this.registerController = new RegisterController<T>(
      this.repository,
      this.encryptor
    );
    this.deleteController = new DeleteController<T>(this.repository);
    this.updateController = new UpdateController<T>(this.repository);
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
