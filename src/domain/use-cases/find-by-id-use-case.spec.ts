import { UsersRepositoryInMemory } from "../../output/repositories/in-memory";
import { createFakeUser } from "../../utils/fake-entity-factory";
import User from "../entities/user";
import NotFoundError from "../errors/not-found";
import { FindByIdUseCase } from "./";

describe("tests for use case - Find By Id", () => {
  describe.each`
    Entity         | entityName | createRepository                       | fakeEntity
    ${User.Entity} | ${"users"} | ${() => new UsersRepositoryInMemory()} | ${createFakeUser({}).entity}
  `(
    "to $entityName",
    ({ Entity, entityName, createRepository, fakeEntity }) => {
      beforeEach(() => {
        jest.clearAllMocks();
      });

      test("given a Id, should find instance of $entityName", async () => {
        const repository = createRepository();
        const sut = new FindByIdUseCase<typeof Entity>(repository);
        const spy = jest.spyOn(repository, "findById");

        const savedId = await repository.save(fakeEntity);
        const result = await sut.execute(savedId);

        expect.assertions(2);
        expect(result).toBeTruthy();
        expect(spy).toHaveBeenCalledTimes(1);
      });

      test("given a invalid Id, should throw an error", async () => {
        const repository = createRepository();
        const sut = new FindByIdUseCase<typeof Entity>(repository);
        const spy = jest.spyOn(repository, "findById");

        expect.assertions(2);
        try {
          await sut.execute("1");
        } catch (error) {
          expect(error).toBeInstanceOf(NotFoundError);
          expect(spy).toHaveBeenCalledTimes(1);
        }
      });
    }
  );
});
