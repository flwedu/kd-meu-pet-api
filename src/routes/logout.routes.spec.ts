import request from "supertest";
import { configureExpress } from "../config/config-express-app";
import { UsersRepositoryInMemory } from "../output/repositories/in-memory";
import { makeBcryptEncryptor } from "../security/bcrypt";

describe("Logout Routes", () => {
  const repositories = {
    users: new UsersRepositoryInMemory(),
  };
  const app = configureExpress(repositories, makeBcryptEncryptor("secret"));

  describe("POST /logout", () => {
    test("should return a success response", async () => {
      const response = await request(app).post("/api/logout");
      expect(response.status).toBe(200);
    });
  });

  describe("GET /logout", () => {
    test("should return a success response", async () => {
      const response = await request(app).get("/api/logout");
      expect(response.status).toBe(200);
    });
  });
});
