import request from "supertest";
import { configureExpress } from "../config/config-express-app";
import makeInMemoryRepositoryWrapper from "../output/repositories/in-memory/in-memory-repository-wrapper";
import { makeBcryptEncryptor } from "../security/bcrypt";
import { createFakeUser } from "../utils/fake-entity-factory";

describe("Login Routes", () => {
  const repositories = makeInMemoryRepositoryWrapper();
  const encryptor = makeBcryptEncryptor("secret");
  const app = configureExpress(repositories, encryptor);

  beforeAll(async () => {
    await repositories.users.save(
      createFakeUser(
        { username: "test", password: encryptor.encrypt("test") },
        "1"
      ).entity
    );
  });

  describe("POST /login", () => {
    test("should return a success response", async () => {
      const response = await request(app)
        .post("/api/login")
        .send({ username: "test", password: "test" });
      expect(response.status).toBe(200);
    });

    test("should return a error response", async () => {
      const response = await request(app)
        .post("/api/login")
        .send({ username: "test", password: "wrong" });
      expect(response.status).toBe(401);
    });
  });
  describe("GET /login", () => {
    test("should return a success response", async () => {
      const response = await request(app).get("/api/login");
      expect(response.status).toBe(200);
    });
  });
});
