import ValidationError from "../../domain/errors/validation-error";
import {
  AnimalsRepositoryInMemory,
  OccurrencesRepositoryInMemory,
  UsersRepositoryInMemory,
} from "../../output/repositories/in-memory";
import { makeBcryptEncryptor } from "../../security/bcrypt";
import { ControllersFactory } from "../../utils/controllers-factory";
import {
  createFakeAnimal,
  createFakeOccurrence,
  createFakeUser,
} from "../../utils/fake-entity-factory";

describe("# Register Controller test #", () => {
  const encryptor = makeBcryptEncryptor("secret");
  describe.each`
    repositoryFactory                            | path             | body
    ${() => new UsersRepositoryInMemory()}       | ${"users"}       | ${createFakeUser({}).props}
    ${() => new AnimalsRepositoryInMemory()}     | ${"animals"}     | ${createFakeAnimal({}).props}
    ${() => new OccurrencesRepositoryInMemory()} | ${"occurrences"} | ${createFakeOccurrence({}).props}
  `("For $path entities", ({ repositoryFactory, path, body }) => {
    const repository = repositoryFactory();
    const factory = new ControllersFactory(repository, encryptor);
    const controller = factory.getControllers().register;
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(() => res),
      send: jest.fn(() => res),
    };
    const next = jest.fn();

    beforeEach(() => {
      jest.clearAllMocks();
    });

    test("For a success creation, should call res.status() with 201 status code", async () => {
      const req = {
        path,
        body,
      };

      //@ts-ignore
      await controller.handle(req, res, next);

      expect.assertions(2);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledTimes(1);
    });

    test("For a empty body, should call res.status() with 400 status code", async () => {
      const req = {
        path,
        body: {},
      };

      //@ts-ignore
      await controller.handle(req, res, next);

      expect.assertions(2);
      expect(next).toHaveBeenCalledTimes(1);
      expect(next).toHaveBeenCalledWith(expect.any(ValidationError));
    });
  });
});
