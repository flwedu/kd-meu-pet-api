import { Router } from "express";
import User from "../domain/entities/user";
import { makeControllers } from "../utils/controllers-factory";

export default function (router: Router, repositories: any) {
  const controllersFactory = makeControllers<User.Entity>(repositories.users);

  router.get("/users/:id", controllersFactory.findByIdController);
  router.post("/users", controllersFactory.registerController);
  router.put("/users/:id", controllersFactory.updateController);
  router.delete("/users/:id", controllersFactory.deleteController);
}
