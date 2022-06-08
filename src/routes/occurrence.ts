import { Router } from "express";
import Occurrence from "../domain/entities/occurrence";
import {
  makeDeleteController,
  makeFindByIdController,
  makeRegisterController,
  makeUpdateController,
} from "../input/controllers";

export default function (router: Router, repositories: any) {
  const findByIdController = makeFindByIdController<Occurrence.Entity>(
    repositories.occurrences
  );
  const registerController = makeRegisterController<Occurrence.Entity>(
    repositories.occurrences
  );
  const deleteController = makeDeleteController<Occurrence.Entity>(
    repositories.occurrences
  );
  const updateController = makeUpdateController<Occurrence.Entity>(
    repositories.occurrences
  );

  router.get("/occurrences/:id", findByIdController);
  router.post("/occurrences", registerController);
  router.put("/occurrences", updateController);
  router.delete("/occurrences", deleteController);
}
