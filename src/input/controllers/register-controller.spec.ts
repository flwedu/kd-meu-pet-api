import User from "../../domain/entities/user";
import {
  createFakeAnimal,
  createFakeUser,
} from "../../utils/fake-entity-factory";
import IRepository from "../../output/repositories/repository-interface";
import {
  UsersRepositoryInMemory,
  AnimalsRepositoryInMemory,
} from "../../output/repositories/in-memory";
import { makeRegisterController } from "./";
import Animal from "../../domain/entities/animal";

describe("# Controller - Create #", () => {
  describe.each`
    Entity           | createNewRepository                      | path         | body
    ${User.Entity}   | ${() => new UsersRepositoryInMemory()}   | ${"users"}   | ${createFakeUser({}).props}
    ${Animal.Entity} | ${() => new AnimalsRepositoryInMemory()} | ${"animals"} | ${createFakeAnimal({}).props}
  `("For $path", ({ Entity, createNewRepository, path, body }) => {
    let repository: IRepository<typeof Entity>;
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(() => res),
      send: jest.fn(() => res),
    };

    beforeEach(() => {
      repository = createNewRepository();
      jest.clearAllMocks();
    });

    test("For a success creation, should call res.status() with 201 status code", async () => {
      const controller = makeRegisterController(repository);
      const req = {
        path,
        body,
      };

      //@ts-ignore
      await controller(req, res);

      expect.assertions(2);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledTimes(1);
    });

    test("For a empty body, should call res.status() with 400 status code", async () => {
      const controller = makeRegisterController(repository);
      const req = {
        path,
        body: {},
      };

      //@ts-ignore
      await controller(req, res);

      expect.assertions(2);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledTimes(1);
    });
  });
});
