import { Router } from "express";
import User from "../domain/entities/user";
import { makeAuthenticationMiddleware } from "../input/middlewares/auth-middleware-factory";
import IEncryptor from "../security/encryptor-interface";
import { makeControllers } from "../utils/controllers-factory";

export default function (
  router: Router,
  repositories: any,
  encryptor?: IEncryptor
) {
  const controllersFactory = makeControllers<User.Entity>(
    repositories.users,
    encryptor
  );
  const onlyAdmin = makeAuthenticationMiddleware(repositories.users, [
    User.Role.ADMIN,
  ]);
  const allLoggedUsers = makeAuthenticationMiddleware(repositories.users, [
    User.Role.ADMIN,
    User.Role.USER,
  ]);

  router.get(
    "/users/:id",
    allLoggedUsers,
    controllersFactory.findByIdController
  );
  router.post("/users", allLoggedUsers, controllersFactory.registerController);
  router.put("/users/:id", onlyAdmin, controllersFactory.updateController);
  router.delete("/users/:id", onlyAdmin, controllersFactory.deleteController);
}
