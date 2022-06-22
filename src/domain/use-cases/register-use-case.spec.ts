import {
  AnimalsRepositoryInMemory,
  OccurrencesRepositoryInMemory,
  UsersRepositoryInMemory,
} from "../../output/repositories/in-memory";
import { makeBcryptEncryptor } from "../../security/bcrypt";
import {
  createFakeAnimal,
  createFakeOccurrence,
  createFakeUser,
} from "../../utils/fake-entity-factory";
import Animal from "../entities/animal";
import Occurrence from "../entities/occurrence";
import User from "../entities/user";
import ValidationError from "../errors/validation-error";
import { RegisterUseCase } from "./";

describe("test for Use Case - Register", () => {
  const encryptor = makeBcryptEncryptor("secret");
  describe.each`
    Entity               | entityName       | createRepository                             | props
    ${User.Entity}       | ${"users"}       | ${() => new UsersRepositoryInMemory()}       | ${createFakeUser({}).props}
    ${Animal.Entity}     | ${"animals"}     | ${() => new AnimalsRepositoryInMemory()}     | ${createFakeAnimal({}).props}
    ${Occurrence.Entity} | ${"occurrences"} | ${() => new OccurrencesRepositoryInMemory()} | ${createFakeOccurrence({}).props}
  `("# to $entityName #", ({ Entity, entityName, createRepository, props }) => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    test("given valid props, should save a entity and return the Id", async () => {
      const repository = createRepository();
      const spy = jest.spyOn(repository, "save");
      const sut = new RegisterUseCase<typeof Entity>(
        repository,
        entityName,
        encryptor
      );

      const createdId = await sut.execute(props);

      expect.assertions(3);
      expect(createdId).toEqual(expect.any(String));
      expect(spy).toHaveBeenCalledTimes(1);
      expect(await repository.findById(createdId)).toMatchObject({
        id: createdId,
        props,
      });
    });

    test("given empty props, should throw an error", async () => {
      const repository = createRepository();
      const spy = jest.spyOn(repository, "save");
      const sut = new RegisterUseCase<typeof Entity>(
        repository,
        entityName,
        encryptor
      );

      expect.assertions(2);
      try {
        await sut.execute({});
      } catch (error) {
        expect(error).toBeInstanceOf(ValidationError);
        expect(spy).toHaveBeenCalledTimes(0);
      }
    });

    test.each(["animal", null, undefined, "xyz", ""])(
      "Given a invalid entityName to $entityName, should throw an Error",
      async (invalidEntityName) => {
        const repository = createRepository();

        try {
          new RegisterUseCase<typeof Entity>(
            repository,
            // @ts-ignore
            invalidEntityName,
            encryptor
          );
        } catch (error) {
          expect.assertions(1);
          expect(error).toBeInstanceOf(Error);
        }
      }
    );
  });
});
