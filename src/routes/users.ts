import { Router } from "express";

export default (router: Router) => {
  router.get("/users/:id", (req, res) => res.send(200));
  // router.post("/users", createUserController)
  // router.put("/users/:id", updateUserController)
  // router.delete("/users/:id", deleteUserController)
};
