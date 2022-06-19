import { Express, Router } from "express";
import fs from "fs";
import { catchError } from "../input/middlewares/catch-error";
import IRepositoriesWrapper from "../output/repositories/repositories-wrapper-interface";
import IEncryptor from "../security/encryptor-interface";

const configureRoutes = (
  app: Express,
  repositories: IRepositoriesWrapper,
  encryptor: IEncryptor
) => {
  const router = Router();
  app.use("/api", router);
  fs.readdirSync(`${__dirname}/../routes`).map(async (fileName) => {
    if (!fileName.includes(".spec.")) {
      const routeRegister = await import(`../routes/${fileName}`);
      routeRegister.default(router, repositories, encryptor);
    }
  });

  //Error handling
  router.use(catchError);
};

export { configureRoutes };
