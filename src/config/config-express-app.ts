import Express from "express";
import configureMiddlewares from "./config-middlewares";
import configureRoutes from "./config-routes";

function configureExpress(repositories: any) {
  const expressApp = Express();

  configureMiddlewares(expressApp);
  configureRoutes(expressApp, repositories);

  return expressApp;
}

export { configureExpress };
