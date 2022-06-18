import { Router } from "express";
import { LoginUserController } from "../input/controllers/users/login-user-controller";
import IRepositoriesWrapper from "../output/repositories/repositories-wrapper-interface";
import IEncryptor from "../security/encryptor-interface";

export default function (
  router: Router,
  repositories: IRepositoriesWrapper,
  encryptor: IEncryptor
) {
  const loginController = new LoginUserController(
    repositories.users,
    encryptor
  );

  router.post("/login", (req, res, next) =>
    loginController.handle(req, res, next)
  );

  router.get("/login", (req, res) => {
    res.send("Login");
  });
}
