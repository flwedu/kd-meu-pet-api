import { Router } from "express";
import User from "../domain/entities/user";
import { makeAuthenticationMiddleware } from "../input/middlewares/auth-middleware-factory";
import IRepositoriesWrapper from "../output/repositories/repositories-wrapper-interface";
import IEncryptor from "../security/encryptor-interface";
import { ControllersFactory } from "../utils/controllers-factory";

export default function (
  router: Router,
  repositories: IRepositoriesWrapper,
  encryptor?: IEncryptor
) {
  const controllers = new ControllersFactory<User.Entity>(
    repositories.users,
    encryptor
  ).getControllers();
  const onlyAdmin = makeAuthenticationMiddleware(repositories.users, [
    User.Role.ADMIN,
  ]);
  const allLoggedUsers = makeAuthenticationMiddleware(repositories.users, [
    User.Role.ADMIN,
    User.Role.USER,
  ]);

  router.get("/users/:id", allLoggedUsers, controllers.findById.handle);
  router.post("/users", allLoggedUsers, controllers.register.handle);
  router.put("/users/:id", onlyAdmin, controllers.update.handle);
  router.delete("/users/:id", onlyAdmin, controllers._delete.handle);
}
