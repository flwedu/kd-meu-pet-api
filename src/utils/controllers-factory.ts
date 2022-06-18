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

  public findByIdController = new FindByIdController<T>(this.repository);
  public registerController = new RegisterController<T>(
    this.repository,
    this.encryptor
  );
  public deleteController = new DeleteController<T>(this.repository);
  public updateController = new UpdateController<T>(this.repository);

  public getControllers = () => {
    return {
      findById: this.findByIdController,
      register: this.registerController,
      _delete: this.deleteController,
      update: this.updateController,
    };
  };
}
