import User from "../entities/user";
import IRepository from "../../output/repositories/repository-interface";
import {
  AnimalsRepositoryInMemory,
  UsersRepositoryInMemory,
} from "../../output/repositories/in-memory";
import makeCreateUseCaseFn from "./create-use-case";
import {
  createFakeUser,
  createFakeAnimal,
} from "../../utils/fake-entity-factory";
import Animal from "../entities/animal";

describe("# Create Use Case function to User Entity #", () => {
  let repository: IRepository<User.Entity>;
  const props = createFakeUser({}).props;

  beforeEach(() => {
    repository = new UsersRepositoryInMemory();
  });

  test("given valid props, should save a entity and return the Id", async () => {
    const spy = jest.spyOn(repository, "save");
    const sut = makeCreateUseCaseFn<User.Entity>(repository, "users");

    const createdId = await sut(props);

    expect.assertions(3);
    expect(createdId).toEqual(expect.any(String));
    expect(spy).toHaveBeenCalledTimes(1);
    expect(await repository.findById(createdId)).toMatchObject({
      id: createdId,
      props,
    });
  });
});

describe("# Create Use Case function to Animal Entity #", () => {
  let repository: IRepository<Animal.Entity>;
  const props = createFakeAnimal({}).props;

  beforeEach(() => {
    repository = new AnimalsRepositoryInMemory();
  });

  test("given valid props, should save a entity and return the Id", async () => {
    const spy = jest.spyOn(repository, "save");
    const sut = makeCreateUseCaseFn<Animal.Entity>(repository, "animals");

    const createdId = await sut(props);

    expect.assertions(3);
    expect(createdId).toEqual(expect.any(String));
    expect(spy).toHaveBeenCalledTimes(1);
    expect(await repository.findById(createdId)).toMatchObject({
      id: createdId,
      props,
    });
  });
});
