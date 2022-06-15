import { Router } from "express";
import { makeLogoutController } from "../input/controllers/users/logout-user-controller";

export default function (router: Router) {
  const logoutController = makeLogoutController();

  router.post("/api/logout", logoutController);
  router.get("/api/logout", logoutController);
}
