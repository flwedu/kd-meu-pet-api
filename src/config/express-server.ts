import { Server } from "@overnightjs/core";
import { AnimalsControllers } from "../input/controllers-routes/animals.routes";
import IRepositoriesWrapper from "../output/repositories/repositories-wrapper-interface";
import IEncryptor from "../security/encryptor-interface";
import { configureMiddlewares } from "./config-middlewares";

export class ExpressServer extends Server {
  constructor(
    private repositories: IRepositoriesWrapper,
    private encryptor: IEncryptor
  ) {
    super();

    configureMiddlewares(this.app);

    const animalsController = new AnimalsControllers(repositories, encryptor);

    super.addControllers([animalsController]);
  }

  public start(port: number): void {
    this.app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  }

  public getApp(): any {
    return this.app;
  }
}
