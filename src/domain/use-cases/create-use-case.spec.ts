import User from "../entities/user";
import IRepository from "../../output/repositories/repository-interface";
import UsersRepositoryInMemory from "../../output/repositories/in-memory/users-repository-in-memory";
import makeCreateUseCaseFn from "./create-use-case";

describe("# Create Use Case function to User Entity #", () => {
  let userRepository: IRepository<User.Entity>;
  const props = {
    username: "testUsername",
    password: "test",
    email: "test@example.com",
    fullName: "John Smith",
    profilePic: "",
    role: User.Role.USER,
  } as User.Props;

  beforeEach(() => {
    userRepository = new UsersRepositoryInMemory();
  });

  test("given valid props, should save a entity and return the Id", async () => {
    const spy = jest.spyOn(userRepository, "save");
    const sut = makeCreateUseCaseFn<User.Entity>(
      userRepository,
      (props) => new User.Entity(props)
    );

    const createdId = await sut(props);

    expect.assertions(3);
    expect(createdId).toEqual(expect.any(String));
    expect(spy).toHaveBeenCalledTimes(1);
    expect(await userRepository.findById(createdId)).toMatchObject({
      id: createdId,
      props,
    });
  });
});
