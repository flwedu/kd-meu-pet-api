import { Router } from "express";
import User from "../domain/entities/user";
import { makeFindByIdController } from "../input/controllers/find-by-id-controller";

export default function (router: Router, repositories: any) {
  const findByIdController = makeFindByIdController<User.Entity>(
    repositories.users
  );

  router.get("/users/:id", findByIdController);
  // router.post("/users", createUserController)
  // router.put("/users/:id", updateUserController)
  // router.delete("/users/:id", deleteUserController)
}
