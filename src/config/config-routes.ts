import { Express, Router } from "express"
import fs from "fs"

export default (app: Express) => {
  const router = Router()
  app.use("/api", router)
  fs.readdirSync(`${__dirname}/../routes`).map(async (fileName) => {
    if (!fileName.includes(".test.")) {
      ;(await import(`../routes/${fileName}`)).default(router)
    }
  })
}
