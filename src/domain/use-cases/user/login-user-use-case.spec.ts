import { UsersRepositoryInMemory } from "../../../output/repositories/in-memory";
import { makeLoginUserUseCase } from "./login-user-use-case";
import { createFakeUser } from "../../../utils/fake-entity-factory";
import { makeBcryptEncryptor } from "../../../security/bcrypt";

describe("Login User use case", () => {
  test("Should login a user", async () => {
    const encryptor = makeBcryptEncryptor("secret");
    const user = createFakeUser(
      { username: "test", password: encryptor.encrypt("password") },
      "1"
    ).entity;

    const repository = new UsersRepositoryInMemory();
    await repository.save(user);

    const sut = makeLoginUserUseCase(repository, encryptor);
    const result = await sut({ username: "test", password: "password" });

    expect.assertions(1);
    expect(result).toEqual(user);
  });

  test("Should throw if user not found", async () => {
    const encryptor = makeBcryptEncryptor("secret");
    const user = createFakeUser(
      { username: "test", password: encryptor.encrypt("password") },
      "1"
    ).entity;

    const repository = new UsersRepositoryInMemory();
    await repository.save(user);

    const sut = makeLoginUserUseCase(repository, encryptor);
    await expect(
      sut({ username: "test", password: "wrong password" })
    ).rejects.toThrow("Invalid username or password");
  });
});
