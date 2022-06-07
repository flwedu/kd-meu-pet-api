import { Router } from "express";
import User from "../domain/entities/user";
import { makeCreateController } from "../input/controllers/create-controller";
import { makeDeleteController } from "../input/controllers/delete-controller";
import { makeFindByIdController } from "../input/controllers/find-by-id-controller";

export default function (router: Router, repositories: any) {
  const findByIdController = makeFindByIdController<User.Entity>(
    repositories.users
  );
  const createController = makeCreateController<User.Entity>(
    repositories.users
  );
  const deleteController = makeDeleteController<User.Entity>(
    repositories.users
  );

  router.get("/users/:id", findByIdController);
  router.post("/users", createController);
  // router.put("/users/:id", updateUserController)
  router.delete("/users/:id", deleteController);
}
