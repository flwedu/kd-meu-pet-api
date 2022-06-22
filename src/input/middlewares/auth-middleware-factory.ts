import { NextFunction, Request, Response } from "express";
import User from "../../domain/entities/user";
import { AuthenticationError } from "../../domain/errors/auth-error";
import IRepository from "../../output/repositories/repository-interface";

export function makeAuthenticationMiddleware(
  repository: IRepository<User.Entity>,
  roles: User.Role[]
) {
  function checkPrivileges(userRole: User.Role) {
    return userRole in roles;
  }

  return async (
    req: Request & { session: any },
    res: Response,
    next: NextFunction
  ) => {
    const { loggedId } = req.session;
    if (!loggedId) throw new AuthenticationError("Authentication is required");

    try {
      const loggedUser = await repository.findById(loggedId);
      if (checkPrivileges(loggedUser.props.role)) {
        next();
      }
      throw new AuthenticationError(
        "Logged user has not privileges to do this operation"
      );
    } catch (error) {
      next(error);
    }
  };
}
