import supertest from "supertest";
import { configureExpress } from "../config/config-express-app";
import { AnimalsRepositoryInMemory } from "../output/repositories/in-memory";
import { makeBcryptEncryptor } from "../security/bcrypt";
import { createFakeAnimal } from "../utils/fake-entity-factory";

describe("# Animals routes #", () => {
  const repository = new AnimalsRepositoryInMemory();
  const encryptor = makeBcryptEncryptor("secret");
  const app = configureExpress({ animals: repository }, encryptor);

  beforeAll(async () => {
    await repository.save(createFakeAnimal({}, "1").entity);
  });

  describe("# GET", () => {
    describe("api/animals/:id", () => {
      test("with a valid id, should return 200 OK", async () => {
        await supertest(app).get("/api/animals/1").expect(200);
      });

      test("with a inexistent id, should return 404", async () => {
        await supertest(app).get("/api/animals/2").expect(404);
      });
    });
    test("/api/animals, should return 404", async () => {
      await supertest(app).get("/api/animals").expect(404);
    });
  });

  describe("#POST to /api/animals", () => {
    const animal = createFakeAnimal({});
    test("with valid body data, should return 201", async () => {
      const data = {
        id: animal.entity.id,
        ...animal.props,
      };

      const response = await supertest(app).post("/api/animals").send(data);

      expect.assertions(2);
      expect(response.statusCode).toEqual(201);
      expect(response.body).toEqual({
        message: `created successfully with id ${animal.entity.id}`,
      });
    });

    test.each([{ name: null }, { description: null }])(
      "with missing props, should return 400",
      async (props) => {
        const data = {
          ...animal.props,
          ...props,
        };

        const response = await supertest(app).post("/api/animals").send(data);

        expect.assertions(1);
        expect(response.statusCode).toEqual(400);
      }
    );
  });
});
