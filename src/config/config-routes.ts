import { Express, Router } from "express";
import fs from "fs";

export default (app: Express, repositories: any) => {
  const router = Router();
  app.use("/api", router);
  fs.readdirSync(`${__dirname}/../routes`).map(async (fileName) => {
    if (!fileName.includes(".spec.")) {
      const routeRegister = await import(`../routes/${fileName}`);
      routeRegister.default(router, repositories);
    }
  });
};
