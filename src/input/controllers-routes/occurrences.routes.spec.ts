import supertest from "supertest";
import getInMemoryRepositories from "../../config/configure-repositories-in-memory";
import { ExpressServer } from "../../config/express-server";
import { makeBcryptEncryptor } from "../../security/bcrypt";
import { createFakeOccurrence } from "../../utils/fake-entity-factory";

describe("## Occurrences routes ##", () => {
  const repositories = getInMemoryRepositories();
  const encryptor = makeBcryptEncryptor("secret");
  const app = new ExpressServer(repositories, encryptor).getApp();

  describe("When #GET to api/occurrences/:id", () => {
    test("for a valid id, should return 200 OK", async () => {
      const occurrence = createFakeOccurrence({}).entity;
      await repositories.occurrences.save(occurrence);
      const response = await supertest(app).get(
        `/api/occurrences/${occurrence.id}`
      );

      expect.assertions(1);
      expect(response.status).toBe(200);
    });

    test("for a inexistent id, should return 404", async () => {
      const response = await supertest(app).get("/api/occurrences/2");

      expect.assertions(1);
      expect(response.status).toBe(404);
    });
  });

  test("When #GET to /api/occurrences, should return 404", async () => {
    const response = await supertest(app).get("/api/occurrences/2");

    expect.assertions(1);
    expect(response.status).toBe(404);
  });

  describe("When #POST to /api/occurrences", () => {
    test("Should return 201 with valid body data", async () => {
      const occurrence = createFakeOccurrence({});

      const response = await supertest(app)
        .post("/api/occurrences")
        .send(occurrence.props);

      expect.assertions(1);
      expect(response.status).toBe(201);
    });
  });
});
