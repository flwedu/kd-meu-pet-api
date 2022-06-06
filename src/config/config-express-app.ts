import Express from "express";
import configureMiddlewares from "./config-middlewares";
import configureRoutes from "./config-routes";

export function configureExpress(repositories: any) {
  const expressApp = Express();

  configureMiddlewares(expressApp);
  configureRoutes(expressApp, repositories);

  return expressApp;
}
