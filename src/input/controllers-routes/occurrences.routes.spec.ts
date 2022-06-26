import supertest from "supertest";
import getInMemoryRepositories from "../../config/configure-repositories-in-memory";
import { ExpressServer } from "../../config/express-server";
import { makeBcryptEncryptor } from "../../security/bcrypt";
import { createFakeOccurrence } from "../../utils/fake-entity-factory";

describe("## Occurrences routes ##", () => {
  const repositories = getInMemoryRepositories();
  const encryptor = makeBcryptEncryptor("secret");
  const app = new ExpressServer(repositories, encryptor).getApp();

  describe("GET to api/occurrences/:id", () => {
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

  test("GET to /api/occurrences, should return 404", async () => {
    const response = await supertest(app).get("/api/occurrences/2");

    expect.assertions(1);
    expect(response.status).toBe(404);
  });

  describe("POST to /api/occurrences", () => {
    test("Should return 201 with valid body data", async () => {
      const occurrence = createFakeOccurrence({});

      const response = await supertest(app)
        .post("/api/occurrences")
        .send(occurrence.props);

      expect.assertions(1);
      expect(response.status).toBe(201);
    });
  });

  describe("PUT to /api/occurrences/:id", () => {
    test("Should return 200 with valid body data", async () => {
      const occurrence = createFakeOccurrence({});
      await repositories.occurrences.save(occurrence.entity);

      const response = await supertest(app)
        .put(`/api/occurrences/${occurrence.entity.id}`)
        .send(occurrence.props);

      expect.assertions(1);
      expect(response.status).toBe(200);
    });

    test("Should return 404 with invalid id", async () => {
      const newOccurrence = createFakeOccurrence({});
      const response = await supertest(app)
        .put("/api/occurrences/2")
        .send(newOccurrence.props);

      expect.assertions(1);
      expect(response.status).toBe(404);
    });
  });

  describe("DELETE to /api/occurrences/:id", () => {
    test("Should return 200 with valid body data", async () => {
      const occurrence = createFakeOccurrence({});
      await repositories.occurrences.save(occurrence.entity);

      const response = await supertest(app).delete(
        `/api/occurrences/${occurrence.entity.id}`
      );

      expect.assertions(1);
      expect(response.status).toBe(200);
    });

    test("Should return 404 with invalid id", async () => {
      const response = await supertest(app).delete("/api/occurrences/2");

      expect.assertions(1);
      expect(response.status).toBe(404);
    });
  });
});
