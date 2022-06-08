import { Router } from "express";
import Animal from "../domain/entities/animal";
import { makeControllers } from "../utils/controllers-factory";

export default function (router: Router, repositories: any) {
  const controllersFactory = makeControllers<Animal.Entity>(
    repositories.animals
  );

  router.get("/animals/:id", controllersFactory.findByIdController);
  router.post("/animals", controllersFactory.registerController);
  router.put("/animals/:id", controllersFactory.updateController);
  router.delete("/animals/:id", controllersFactory.deleteController);
}
