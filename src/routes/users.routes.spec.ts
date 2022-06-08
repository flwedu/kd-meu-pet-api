import supertest from "supertest";
import { configureExpress } from "../config/config-express-app";
import { UsersRepositoryInMemory } from "../output/repositories/in-memory";
import { createFakeUser } from "../utils/fake-entity-factory";

describe("## load user routes ##", () => {
  const repository = new UsersRepositoryInMemory();
  const app = configureExpress({ users: repository });

  describe("When #GET to api/users/:id", () => {
    test("for a valid id, should return 200 OK", async () => {
      await repository.save(createFakeUser({}, "1").entity);
      await supertest(app).get("/api/users/1").expect(200);
    });

    test("for a inexistent id, should return 404", async () => {
      await supertest(app).get("/api/users/2").expect(404);
    });
  });

  test("When #GET to /api/users, should return 404", async () => {
    await supertest(app).get("/api/users").expect(404);
  });
});
