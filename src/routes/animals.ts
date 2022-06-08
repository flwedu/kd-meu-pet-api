import { Router } from "express";
import Animal from "../domain/entities/animal";
import { makeCreateController } from "../input/controllers/create-controller";
import { makeDeleteController } from "../input/controllers/delete-controller";
import { makeFindByIdController } from "../input/controllers/find-by-id-controller";

export default function (router: Router, repositories: any) {
  const findByIdController = makeFindByIdController<Animal.Entity>(
    repositories.animals
  );
  const registerController = makeRegisterController<Animal.Entity>(
    repositories.animals
  );
  const deleteController = makeDeleteController<Animal.Entity>(
    repositories.animals
  );

  router.get("/animals:id", findByIdController);
  router.post("/animals", registerController);
  // router.put("/animals:id", updateAnimalController)
  router.delete("/animals:id", deleteController);
}
