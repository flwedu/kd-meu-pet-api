import Express from "express";
import IEncryptor from "../security/encryptor-interface";
import configureMiddlewares from "./config-middlewares";
import configureRoutes from "./config-routes";

export function configureExpress(repositories: any, encryptor: IEncryptor) {
  const expressApp = Express();

  configureMiddlewares(expressApp);
  configureRoutes(expressApp, repositories, encryptor);

  return expressApp;
}
