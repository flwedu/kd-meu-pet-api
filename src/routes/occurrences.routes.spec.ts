import supertest from "supertest";
import { configureExpress } from "../config/config-express-app";
import { OccurrencesRepositoryInMemory } from "../output/repositories/in-memory";
import { createFakeOccurrence } from "../utils/fake-entity-factory";

describe("## load occurrences routes ##", () => {
  const repository = new OccurrencesRepositoryInMemory();
  const app = configureExpress({ occurrences: repository });

  describe("When #GET to api/occurrences/:id", () => {
    test("for a valid id, should return 200 OK", async () => {
      const occurrence = createFakeOccurrence({}).entity;
      await repository.save(occurrence);
      await supertest(app).get(`/api/occurrences/${occurrence.id}`).expect(200);
    });

    test("for a inexistent id, should return 404", async () => {
      await supertest(app).get("/api/occurrences/2").expect(404);
    });
  });

  test("When #GET to /api/occurrences, should return 404", async () => {
    await supertest(app).get("/api/occurrences").expect(404);
  });
});
