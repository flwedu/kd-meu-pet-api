import supertest from "supertest";
import app from "../config/config-express-app";

describe("## load user routes ##", () => {
  describe("When #GET to api/users/:id", () => {
    test("for a valid user, should return 200 OK", async () => {
      await supertest(app).get("/api/users/1").expect(200);
    });

    test("for a inexistent id, should return 404", async () => {
      await supertest(app).get("/api/users/1").expect(404);
    });
  });

  test("When #GET to /api/users, should return 404", async () => {
    await supertest(app).get("/api/users").expect(404);
  });
});
