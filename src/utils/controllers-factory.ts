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

  public findByIdController = new FindByIdController<T>(this.repository).handle;
  public registerController = new RegisterController<T>(
    this.repository,
    this.encryptor
  ).handle;
  public deleteController = new DeleteController<T>(this.repository).handle;
  public updateController = new UpdateController<T>(this.repository).handle;
}
