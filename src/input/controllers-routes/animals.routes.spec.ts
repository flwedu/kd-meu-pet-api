import supertest from "supertest";
import getInMemoryRepositories from "../../config/configure-repositories-in-memory";
import { makeBcryptEncryptor } from "../../security/bcrypt";
import { ExpressServer } from "../../config/express-server";
import { createFakeAnimal } from "../../utils/fake-entity-factory";

describe("# Animals routes #", () => {
  const repositories = getInMemoryRepositories();
  const encryptor = makeBcryptEncryptor("secret");
  const app = new ExpressServer(repositories, encryptor).getApp();

  describe("GET", () => {
    describe("api/animals/:id", () => {
      test("with a valid id, should return 200 OK", async () => {
        const entity = createFakeAnimal({}, "1");
        await repositories.animals.save(entity.entity);
        await supertest(app)
          .get(`/api/animals/${entity.entity.id}`)
          .expect(200);
      });

      test("with a inexistent id, should return 404", async () => {
        await supertest(app).get("/api/animals/2").expect(404);
      });
    });
    test("/api/animals, should return 404", async () => {
      await supertest(app).get("/api/animals").expect(404);
    });
  });

  describe("POST to /api/animals", () => {
    const animal = createFakeAnimal({});
    test("with valid body data, should return 201", async () => {
      const response = await supertest(app)
        .post("/api/animals")
        .send(animal.props);

      expect.assertions(1);
      expect(response.statusCode).toEqual(201);
    });

    test.each([{ name: null }, { description: null }])(
      "with missing props, should return 400",
      async (props) => {
        const data = JSON.stringify({
          ...animal.props,
          ...props,
        });

        const response = await supertest(app).post("/api/animals").send(data);

        expect.assertions(1);
        expect(response.statusCode).toEqual(400);
      }
    );
  });

  describe("PUT to /api/animals/:id", () => {
    const animal = createFakeAnimal({}, "1");
    const newAnimal = createFakeAnimal({});

    test("with valid body data, should return 200", async () => {
      await repositories.animals.save(animal.entity);

      const response = await supertest(app)
        .put(`/api/animals/${animal.entity.id}`)
        .send(newAnimal.props);

      expect.assertions(1);
      expect(response.statusCode).toEqual(200);
    }, 10000);

    test("with a inexistent id, should return 404", async () => {
      await repositories.animals.save(animal.entity);
      const response = await supertest(app)
        .put("/api/animals/2")
        .send(newAnimal.props);

      expect.assertions(1);
      expect(response.statusCode).toEqual(404);
    });
  });

  describe("DELETE to /api/animals/:id", () => {
    const animal = createFakeAnimal({}, "1");

    test("with a valid id, should return 200", async () => {
      await repositories.animals.save(animal.entity);

      const response = await supertest(app).delete(
        `/api/animals/${animal.entity.id}`
      );

      expect.assertions(1);
      expect(response.statusCode).toEqual(200);
    });

    test("with a inexistent id, should return 404", async () => {
      const response = await supertest(app).delete("/api/animals/2");

      expect.assertions(1);
      expect(response.statusCode).toEqual(404);
    });
  });
});
