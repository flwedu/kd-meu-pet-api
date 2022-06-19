import { Request } from "express";
import NotFoundError from "../../domain/errors/not-found";
import {
  AnimalsRepositoryInMemory,
  OccurrencesRepositoryInMemory,
  UsersRepositoryInMemory,
} from "../../output/repositories/in-memory/";
import { ControllersFactory } from "../../utils/controllers-factory";
import { makeBcryptEncryptor } from "../../security/bcrypt";
import {
  createFakeAnimal,
  createFakeOccurrence,
  createFakeUser,
} from "../../utils/fake-entity-factory";

describe("# Find By Id Controller tests #", () => {
  const encryptor = makeBcryptEncryptor("secret");
  describe.each`
    EntityName       | repositoryFactory                            | fakeEntityFactory
    ${"users"}       | ${() => new UsersRepositoryInMemory()}       | ${createFakeUser}
    ${"animals"}     | ${() => new AnimalsRepositoryInMemory()}     | ${createFakeAnimal}
    ${"occurrences"} | ${() => new OccurrencesRepositoryInMemory()} | ${createFakeOccurrence}
  `("For $EntityName entities", ({ repositoryFactory, fakeEntityFactory }) => {
    let repository = repositoryFactory();
    let factory = new ControllersFactory(repository, encryptor);
    const controller = factory.getControllers().findById;
    const res: any = {
      status: jest.fn(() => res),
      json: jest.fn(() => res),
      send: jest.fn(() => res),
    };
    const next = jest.fn();

    beforeEach(async () => {
      jest.clearAllMocks();
    });

    test("For a valid user id, should call res.status() with 200 status code", async () => {
      await repository.save(fakeEntityFactory({}, "1").entity);
      const req: Partial<Request> = {
        params: { id: "1" },
      };

      await controller.handle(req, res, next);

      expect.assertions(2);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledTimes(1);
    });

    test("For a inexistent user id, should call next with 404 status code", async () => {
      const req: Partial<Request> = {
        params: { id: "2" },
      };

      await controller.handle(req, res, next);

      expect.assertions(1);
      expect(next).toHaveBeenCalledWith(new NotFoundError());
    });
  });
});
