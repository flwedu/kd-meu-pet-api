import request from "supertest";
import { configureExpress } from "../config/config-express-app";
import User from "../domain/entities/user";
import makeInMemoryRepositoryWrapper from "../output/repositories/in-memory/in-memory-repository-wrapper";
import { makeBcryptEncryptor } from "../security/bcrypt";
import { createFakeUser } from "../utils/fake-entity-factory";

describe("Users routes", () => {
  const repositories = makeInMemoryRepositoryWrapper();
  const encryptor = makeBcryptEncryptor("secret");
  const app = configureExpress(repositories, encryptor);

  const adminUser = createFakeUser({
    username: "admin",
    role: User.Role.ADMIN,
    password: encryptor.encrypt("admin"),
  }).entity;
  const user = createFakeUser({
    username: "user",
    role: User.Role.USER,
    password: encryptor.encrypt("password"),
  }).entity;

  beforeAll(async () => {
    await repositories.users.save(adminUser);
    await repositories.users.save(user);
  });

  describe("GET to api/users/:id", () => {
    test("Should return a fail (404) to invalid URL", async () => {
      request(app).get("/api/users").expect(404);
    });

    test(" Should return a fail (401) if not logged", () => {
      request(app).get("/api/users/:1").expect(401);
    });

    describe("After authenticated", () => {
      test.each`
        username   | password      | expectedStatus
        ${"admin"} | ${"admin"}    | ${200}
        ${"user"}  | ${"password"} | ${200}
      `(
        "Should GET the data of the user",
        async ({ username, password, expectedStatus }) => {
          const testSession = request(app);

          testSession
            .post("/api/login")
            .send({ username, password })
            .expect(200);
          testSession.get(`/api/users/${adminUser.id}`).expect(expectedStatus);
        }
      );
    });
  });
});
