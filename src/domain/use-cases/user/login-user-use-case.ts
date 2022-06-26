import IRepository from "../../../output/repositories/repository-interface";
import IEncryptor from "../../../security/encryptor-interface";
import User from "../../entities/user";
import { AuthenticationError } from "../../errors/auth-error";

export class LoginUserUseCase {
  constructor(
    private repository: IRepository<User.Entity>,
    private encryptor: IEncryptor
  ) {}
  async execute({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) {
    const user = await this.repository.findOne({ username: username });
    if (user && this.encryptor.checkEquals(password, user.props.password)) {
      return user;
    }
    throw new AuthenticationError("Invalid username or password");
  }
}
