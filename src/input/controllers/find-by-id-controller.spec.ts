import NotFoundError from "../../domain/errors/not-found";
import {
  AnimalsRepositoryInMemory,
  OccurrencesRepositoryInMemory,
  UsersRepositoryInMemory,
} from "../../output/repositories/in-memory/";
import { ControllersFactory } from "../../utils/controllers-factory";
import {
  createFakeAnimal,
  createFakeOccurrence,
  createFakeUser,
} from "../../utils/fake-entity-factory";

describe("# Find By Id Controller tests #", () => {
  describe.each`
    EntityName       | repositoryFactory                            | fakeEntityFactory
    ${"users"}       | ${() => new UsersRepositoryInMemory()}       | ${createFakeUser}
    ${"animals"}     | ${() => new AnimalsRepositoryInMemory()}     | ${createFakeAnimal}
    ${"occurrences"} | ${() => new OccurrencesRepositoryInMemory()} | ${createFakeOccurrence}
  `("For $EntityName entities", ({ repositoryFactory, fakeEntityFactory }) => {
    let repository = repositoryFactory();
    let factory = new ControllersFactory(repository);
    const controller = factory.getControllers().findById;
    const res = {
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
      const req = {
        params: { id: 1 },
      };

      //@ts-ignore
      await controller.handle(req, res, next);

      expect.assertions(2);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledTimes(1);
    });

    test("For a inexistent user id, should call next with 404 status code", async () => {
      const req = {
        params: { id: 2 },
      };

      //@ts-ignore
      await controller.handle(req, res, next);

      expect.assertions(1);
      expect(next).toHaveBeenCalledWith(new NotFoundError());
    });
  });
});
