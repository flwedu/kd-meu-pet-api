import { Router } from "express";
import Occurrence from "../domain/entities/occurrence";
import { makeControllers } from "../utils/controllers-factory";

export default function (router: Router, repositories: any) {
  const controllersFactory = makeControllers<Occurrence.Entity>(
    repositories.occurrences
  );

  router.get("/occurrences/:id", controllersFactory.findByIdController);
  router.post("/occurrences", controllersFactory.registerController);
  router.put("/occurrences", controllersFactory.updateController);
  router.delete("/occurrences", controllersFactory.deleteController);
}
