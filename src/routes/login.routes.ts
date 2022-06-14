import { Router } from "express";
import { makeLoginUserController } from "../input/controllers/users/login-user-controller";
import IEncryptor from "../security/encryptor-interface";

export default function (
  router: Router,
  repositories: any,
  encryptor: IEncryptor
) {
  const loginController = makeLoginUserController(
    repositories.users,
    encryptor
  );

  router.post("/login", loginController);

  router.get("/login", (req, res) => {
    res.send("Login");
  });
}
