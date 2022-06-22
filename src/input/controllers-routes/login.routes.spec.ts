import supertest from "supertest";
import getInMemoryRepositories from "../../config/configure-repositories-in-memory";
import { ExpressServer } from "../../config/express-server";
import { makeBcryptEncryptor } from "../../security/bcrypt";
import { createFakeUser } from "../../utils/fake-entity-factory";

describe("Login Routes", () => {
  const repositories = getInMemoryRepositories();
  const encryptor = makeBcryptEncryptor("secret");
  const app = new ExpressServer(repositories, encryptor).getApp();

  beforeAll(async () => {
    await repositories.users.save(
      createFakeUser(
        { username: "test", password: encryptor.encrypt("test") },
        "1"
      ).entity
    );
  });

  describe("POST /api/login", () => {
    test("should return a success response", async () => {
      const response = await supertest(app)
        .post("/api/login")
        .send({ username: "test", password: "test" });

      expect.assertions(1);
      expect(response.status).toBe(200);
    });

    test("should return a error response", async () => {
      const response = await supertest(app)
        .post("/api/login")
        .send({ username: "test", password: "wrong" });

      expect.assertions(1);
      expect(response.status).toBe(401);
    });
  });
  describe("GET /login", () => {
    test("should return a success response", async () => {
      const response = await supertest(app).get("/api/login");

      expect.assertions(1);
      expect(response.status).toBe(200);
    });
  });
});
