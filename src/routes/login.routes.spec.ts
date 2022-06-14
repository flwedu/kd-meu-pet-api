import request from "supertest";
import { configureExpress } from "../config/config-express-app";
import { UsersRepositoryInMemory } from "../output/repositories/in-memory";
import { createFakeUser } from "../utils/fake-entity-factory";
import { makeBcryptEncryptor } from "../security/bcrypt";

describe("Login Routes", () => {
  const repository = new UsersRepositoryInMemory();
  const encryptor = makeBcryptEncryptor("secret");
  const app = configureExpress({ users: repository }, encryptor);

  beforeAll(async () => {
    await repository.save(
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
