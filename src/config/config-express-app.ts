import Express from "express";
import IRepositoriesWrapper from "../output/repositories/repositories-wrapper-interface";
import IEncryptor from "../security/encryptor-interface";
import configureMiddlewares from "./config-middlewares";
import configureRoutes from "./config-routes";

export function configureExpress(
  repositories: IRepositoriesWrapper,
  encryptor: IEncryptor
) {
  const expressApp = Express();

  configureMiddlewares(expressApp);
  configureRoutes(expressApp, repositories, encryptor);

  return expressApp;
}
