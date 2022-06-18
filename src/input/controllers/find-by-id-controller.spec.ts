import User from "../../domain/entities/user";
import { createFakeUser } from "../../utils/fake-entity-factory";
import IRepository from "../../output/repositories/repository-interface";
import UsersRepositoryInMemory from "../../output/repositories/in-memory/users-repository-in-memory";
import { FindByIdController } from "./";

describe("# Find By Id Controller #", () => {
  describe("For User Entity", () => {
    let repository: IRepository<User.Entity>;
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(() => res),
      send: jest.fn(() => res),
    };

    beforeEach(() => {
      repository = new UsersRepositoryInMemory();
      repository.save(createFakeUser({}, "1").entity);
      jest.clearAllMocks();
    });

    test("For a valid user id, should call res.status() with 200 status code", async () => {
      const controller = new FindByIdController(repository);
      const req = {
        params: { id: 1 },
      };

      //@ts-ignore
      await controller.handle(req, res);

      expect.assertions(2);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledTimes(1);
    });

    test("For a inexistent user id, should call res.status() with 404 status code", async () => {
      const controller = new FindByIdController(repository);
      const req = {
        params: { id: 2 },
      };

      //@ts-ignore
      await controller.handle(req, res);

      expect.assertions(1);
      expect(res.status).toHaveBeenCalledWith(404);
    });
  });
});
