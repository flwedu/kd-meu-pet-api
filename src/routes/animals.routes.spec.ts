import supertest from "supertest";
import { configureExpress } from "../config/config-express-app";
import { AnimalsRepositoryInMemory } from "../output/repositories/in-memory";
import { createFakeAnimal } from "../utils/fake-entity-factory";

describe("## load animals routes ##", () => {
  const repository = new AnimalsRepositoryInMemory();
  const app = configureExpress({ animals: repository });

  describe("When #GET to api/animals/:id", () => {
    test("for a valid id, should return 200 OK", async () => {
      await repository.save(createFakeAnimal({}, "1").entity);
      await supertest(app).get("/api/animals/1").expect(200);
    });

    test("for a inexistent id, should return 404", async () => {
      await supertest(app).get("/api/animals/2").expect(404);
    });
  });

  test("When #GET to /api/animals, should return 404", async () => {
    await supertest(app).get("/api/animals").expect(404);
  });
});
