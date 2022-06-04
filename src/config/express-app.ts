import Express from "express";
import configureMiddlewares from "./middlewares";
import configureRoutes from "./config-routes";

const expressApp = Express();

configureMiddlewares(expressApp);
configureRoutes(expressApp);

export default expressApp;
