import { Express, Router } from "express";
import fs from "fs";
import { catchError } from "../input/middlewares/catch-error";
import IEncryptor from "../security/encryptor-interface";

export default (app: Express, repositories: any, encryptor: IEncryptor) => {
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
