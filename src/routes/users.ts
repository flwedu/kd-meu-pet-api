import { Router } from "express";
import User from "../domain/entities/user";
import {
  makeFindByIdController,
  makeRegisterController,
  makeDeleteController,
  makeUpdateController,
} from "../input/controllers";

export default function (router: Router, repositories: any) {
  const findByIdController = makeFindByIdController<User.Entity>(
    repositories.users
  );
  const registerController = makeRegisterController<User.Entity>(
    repositories.users
  );
  const deleteController = makeDeleteController<User.Entity>(
    repositories.users
  );
  const updateController = makeUpdateController<User.Entity>(
    repositories.users
  );

  router.get("/users/:id", findByIdController);
  router.post("/users", registerController);
  router.put("/users/:id", updateController);
  router.delete("/users/:id", deleteController);
}
