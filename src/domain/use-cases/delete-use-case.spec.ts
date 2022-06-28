import {
  UsersRepositoryInMemory,
  AnimalsRepositoryInMemory,
  OccurrencesRepositoryInMemory,
} from "../../output/repositories/in-memory";
import { DeleteUseCase } from "./";
import { User, Animal, Occurrence } from "../entities";
import {
  createFakeUser,
  createFakeAnimal,
  createFakeOccurrence,
} from "../../utils/fake-entity-factory";

describe("Delete use case", () => {
  describe.each`
    entityName       | Entity               | createRepository                             | fakeEntity
    ${"users"}       | ${User.Entity}       | ${() => new UsersRepositoryInMemory()}       | ${"users"}
    ${"animals"}     | ${Animal.Entity}     | ${() => new AnimalsRepositoryInMemory()}     | ${createFakeAnimal({}).entity}
    ${"occurrences"} | ${Occurrence.Entity} | ${() => new OccurrencesRepositoryInMemory()} | ${createFakeOccurrence({}).entity}
  `(
    `to $entityName`,
    ({ entityName, Entity, createRepository, fakeEntity }) => {
      beforeEach(() => {
        jest.clearAllMocks();
      });

      test("given a Id, should find instance of $entityName", async () => {
        const repository = createRepository();
        const sut = new DeleteUseCase<typeof Entity>(repository);
        const spy = jest.spyOn(repository, "_delete");

        const savedId = await repository.save(fakeEntity);
        const result = await sut.execute(savedId);

        expect.assertions(2);
        expect(result).toEqual(true);
        expect(spy).toHaveBeenCalledTimes(1);
      });
    }
  );
});
