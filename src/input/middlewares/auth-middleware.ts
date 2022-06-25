import { NextFunction, Request, Response } from "express";
import User from "../../domain/entities/user";
import { AuthenticationError } from "../../domain/errors/auth-error";
import IRepository from "../../output/repositories/repository-interface";

export class AuthenticationMiddleware {
  constructor(
    private repository: IRepository<User.Entity>,
    private roles: User.Role[]
  ) {}
  checkPrivileges(userRole: User.Role) {
    return userRole in this.roles;
  }

  async handle(
    req: Request & { session: any },
    res: Response,
    next: NextFunction
  ) {
    const { loggedId } = req.session;
    if (!loggedId) throw new AuthenticationError("Authentication is required");

    try {
      const loggedUser = await this.repository.findById(loggedId);
      if (this.checkPrivileges(loggedUser.props.role)) {
        next();
      }
      throw new AuthenticationError(
        "Logged user has not privileges to do this operation"
      );
    } catch (error) {
      next(error);
    }
  }
}
