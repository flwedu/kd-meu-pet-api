import {
  DeleteController,
  FindByIdController,
  RegisterController,
  UpdateController,
} from "../input/controllers";
import IRepository from "../output/repositories/repository-interface";
import IEncryptor from "../security/encryptor-interface";

export class ControllersFactory<T> {
  constructor(
    private repository: IRepository<T>,
    private encryptor?: IEncryptor
  ) {}

  private findByIdController = new FindByIdController<T>(this.repository);
  private registerController = new RegisterController<T>(
    this.repository,
    this.encryptor
  );
  private deleteController = new DeleteController<T>(this.repository);
  private updateController = new UpdateController<T>(this.repository);

  public getControllers = () => {
    return {
      findById: this.findByIdController,
      register: this.registerController,
      _delete: this.deleteController,
      update: this.updateController,
    };
  };
}
