import { Server } from "@overnightjs/core";
import { AnimalsControllers } from "../input/controllers-routes/animals.routes";
import { LoginController } from "../input/controllers-routes/login.routes";
import { LogoutController } from "../input/controllers-routes/logout.routes";
import { OccurrencesControllers } from "../input/controllers-routes/occurrences.routes";
import { UsersControllers } from "../input/controllers-routes/users.routes";
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

    const loginController = new LoginController(repositories, encryptor);
    const logoutController = new LogoutController();
    const animalsController = new AnimalsControllers(repositories, encryptor);
    const usersController = new UsersControllers(repositories, encryptor);
    const occurrencesController = new OccurrencesControllers(
      repositories,
      encryptor
    );

    super.addControllers([
      loginController,
      logoutController,
      animalsController,
      usersController,
      occurrencesController,
    ]);
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
