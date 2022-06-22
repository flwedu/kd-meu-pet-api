import supertest from "supertest";
import getInMemoryRepositories from "../../config/configure-repositories-in-memory";
import { ExpressServer } from "../../config/express-server";
import { makeBcryptEncryptor } from "../../security/bcrypt";

describe("Logout Routes", () => {
  const repositories = getInMemoryRepositories();
  const encryptor = makeBcryptEncryptor("secret");
  const app = new ExpressServer(repositories, encryptor).getApp();

  describe("POST /logout", () => {
    test("should return a success response", async () => {
      const response = await supertest(app).post("/api/logout").send({});
      expect(response.status).toBe(200);
    });
  });

  describe("GET /logout", () => {
    test("should return a success response", async () => {
      const response = await supertest(app).get("/api/logout");
      expect(response.status).toBe(200);
    });
  });
});
