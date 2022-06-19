import { UsersRepositoryInMemory } from "../../../output/repositories/in-memory";
import { makeBcryptEncryptor } from "../../../security/bcrypt";
import { createFakeUser } from "../../../utils/fake-entity-factory";
import { LoginUserUseCase } from "./login-user-use-case";

describe("Login User use case", () => {
  test("Should login a user", async () => {
    const encryptor = makeBcryptEncryptor("secret");
    const user = createFakeUser(
      { username: "test", password: encryptor.encrypt("password") },
      "1"
    ).entity;

    const repository = new UsersRepositoryInMemory();
    await repository.save(user);

    const sut = new LoginUserUseCase(repository, encryptor);
    const result = await sut.execute({
      username: "test",
      password: "password",
    });

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

    const sut = new LoginUserUseCase(repository, encryptor);
    await expect(
      sut.execute({ username: "test", password: "wrong password" })
    ).rejects.toThrow("Invalid username or password");
  });
});
