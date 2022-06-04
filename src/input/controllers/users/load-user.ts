import { Request, Response } from "express"

function loadUserController(req: Request, res: Response) {
  return res.status(200).send("Ok")
}

export default loadUserController
