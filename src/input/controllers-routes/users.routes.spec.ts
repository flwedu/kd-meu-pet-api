import supertest from "supertest";
import getInMemoryRepositories from "../../config/configure-repositories-in-memory";
import { ExpressServer } from "../../config/express-server";
import User from "../../domain/entities/user";
import { makeBcryptEncryptor } from "../../security/bcrypt";
import { createFakeUser } from "../../utils/fake-entity-factory";

describe("## Users routes ##", () => {
  const repositories = getInMemoryRepositories();
  const encryptor = makeBcryptEncryptor("secret");
  const app = new ExpressServer(repositories, encryptor).getApp();

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
      const response = await supertest(app).get("/api/users");

      expect.assertions(1);
      expect(response.statusCode).toEqual(404);
    });

    test.skip(" Should return a fail (401) if not logged", async () => {
      const response = await supertest(app).get(`/api/users/${user.id}`);

      expect.assertions(1);
      expect(response.statusCode).toEqual(401);
    });

    describe("After authenticated", () => {
      test.each`
        username   | password      | expectedStatus
        ${"admin"} | ${"admin"}    | ${200}
        ${"user"}  | ${"password"} | ${200}
      `(
        "Should GET the data of the user",
        async ({ username, password, expectedStatus }) => {
          const testSession = supertest(app);

          const loginResponse = await testSession
            .post("/api/login")
            .send({ username, password });

          const response = await testSession.get(`/api/users/${adminUser.id}`);

          expect.assertions(2);
          expect(loginResponse.status).toBe(expectedStatus);
          expect(response.status).toBe(expectedStatus);
        }
      );
    });
  });

  describe("POST to api/users", () => {
    test("Should return 201 with a valid body", async () => {
      const user = createFakeUser({});

      const response = await supertest(app).post("/api/users").send(user.props);

      expect.assertions(1);
      expect(response.statusCode).toEqual(201);
    });
  });

  describe("PUT to api/users/:id", () => {
    test("Should return 200 with a valid body", async () => {
      const user = createFakeUser({});

      await repositories.users.save(user.entity);

      const response = await supertest(app)
        .put(`/api/users/${user.entity.id}`)
        .send(user.props);

      expect.assertions(1);
      expect(response.statusCode).toEqual(200);
    }, 5000);

    test("Should return 404 with an invalid id", async () => {
      const newUser = createFakeUser({});

      const response = await supertest(app)
        .put("/api/users/invalid-id")
        .send(newUser.props);

      expect.assertions(1);
      expect(response.statusCode).toEqual(404);
    });
  });

  describe("DELETE to api/users/:id", () => {
    test("Should return 200", async () => {
      const user = createFakeUser({});

      await repositories.users.save(user.entity);

      const response = await supertest(app).delete(
        `/api/users/${user.entity.id}`
      );

      expect.assertions(1);
      expect(response.statusCode).toEqual(202);
    });

    test("Should return 404 with an invalid id", async () => {
      const response = await supertest(app).delete("/api/users/invalid-id");

      expect.assertions(1);
      expect(response.statusCode).toEqual(404);
    });
  });
});
