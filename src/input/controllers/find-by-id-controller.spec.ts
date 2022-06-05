import User from "../../domain/entities/user";
import IRepository from "../../output/repositories/repository-interface";
import UsersRepositoryInMemory from "../../output/repositories/in-memory/users-repository-in-memory";
import { makeFindByIdController } from "./find-by-id-controller";

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
      jest.clearAllMocks();
    });

    test("For a valid user id, should call res.status() with 200 status code", async () => {
      const controller = makeFindByIdController(repository);
      const req = {
        params: { id: 1 },
      };

      //@ts-ignore
      await controller(req, res);

      expect.assertions(2);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledTimes(1);
    });

    test("For a inexistent user id, should call res.status() with 404 status code", async () => {
      const controller = makeFindByIdController(repository);
      const req = {
        params: { id: 2 },
      };

      //@ts-ignore
      await controller(req, res);

      expect.assertions(1);
      expect(res.status).toHaveBeenCalledWith(404);
    });
  });
});
