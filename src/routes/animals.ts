import { Router } from "express";
import Animal from "../domain/entities/animal";
import {
  makeDeleteController,
  makeFindByIdController,
  makeRegisterController,
  makeUpdateController,
} from "../input/controllers";

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
  const updateController = makeUpdateController<Animal.Entity>(
    repositories.animals
  );

  router.get("/animals/:id", findByIdController);
  router.post("/animals", registerController);
  router.put("/animals/:id", updateController);
  router.delete("/animals/:id", deleteController);
}
