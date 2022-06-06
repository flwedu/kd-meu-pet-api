import User from "../entities/user";
import IRepository from "../../output/repositories/repository-interface";
import {
  AnimalsRepositoryInMemory,
  OccurrencesRepositoryInMemory,
  UsersRepositoryInMemory,
} from "../../output/repositories/in-memory";
import makeCreateUseCaseFn from "./create-use-case";
import {
  createFakeUser,
  createFakeAnimal,
  createFakeOccurrence,
} from "../../utils/fake-entity-factory";
import Animal from "../entities/animal";
import Occurrence from "../entities/occurrence";

describe.each`
  entity               | entityName       | createRepository                             | props
  ${User.Entity}       | ${"users"}       | ${() => new UsersRepositoryInMemory()}       | ${createFakeUser({}).props}
  ${Animal.Entity}     | ${"animals"}     | ${() => new AnimalsRepositoryInMemory()}     | ${createFakeAnimal({}).props}
  ${Occurrence.Entity} | ${"occurrences"} | ${() => new OccurrencesRepositoryInMemory()} | ${createFakeOccurrence({}).props}
`(
  "# Create Use Case function to $entity #",
  ({ entity, entityName, createRepository, props }) => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    test("given valid props, should save a entity and return the Id", async () => {
      const repository = createRepository();
      const spy = jest.spyOn(repository, "save");
      const sut = makeCreateUseCaseFn<typeof entity>(repository, entityName);

      const createdId = await sut(props);

      expect.assertions(3);
      expect(createdId).toEqual(expect.any(String));
      expect(spy).toHaveBeenCalledTimes(1);
      expect(await repository.findById(createdId)).toMatchObject({
        id: createdId,
        props,
      });
    });
    test.each(["animal", null, undefined, "xyz", ""])(
      "Given a invalid entityName, should throw an Error",
      async (invalidEntityName) => {
        let repository: IRepository<typeof entity>;
        try {
          //@ts-expect-error
          makeCreateUseCaseFn<Animal.Entity>(repository, invalidEntityName);
        } catch (error) {
          expect.assertions(1);
          expect(error).toBeTruthy();
        }
      }
    );
  }
);
