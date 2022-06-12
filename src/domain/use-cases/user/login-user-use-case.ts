import IRepository from "../../../output/repositories/repository-interface";
import IEncryptor from "../../../security/encryptor-interface";
import User from "../../entities/user";
import { AuthenticationError } from "../../errors/auth-error";

export function makeLoginUserUseCase(
  repository: IRepository<User.Entity>,
  encryptor: IEncryptor
) {
  return async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    const user = await repository.findOne({ username: username });
    if (user && encryptor.checkEquals(password, user.props.password)) {
      return user;
    }
    throw new AuthenticationError("Invalid username or password");
  };
}
