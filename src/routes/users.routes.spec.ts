import supertest from "supertest";
import { configureExpress } from "../config/config-express-app";
import User from "../domain/entities/user";
import UsersRepositoryInMemory from "../output/repositories/in-memory/users-repository-in-memory";

describe("## load user routes ##", () => {
  const users = new UsersRepositoryInMemory();
  users.save({
    id: "1",
    props: {
      fullName: "John Test",
      email: "test@example.com",
      password: "",
      role: User.Role.ADMIN,
      profilePic: "",
      username: "test",
    },
  });
  const app = configureExpress({ users });

  describe("When #GET to api/users/:id", () => {
    test("for a valid user, should return 200 OK", async () => {
      await supertest(app).get("/api/users/1").expect(200);
    });

    test("for a inexistent id, should return 404", async () => {
      await supertest(app).get("/api/users/2").expect(404);
    });
  });

  test("When #GET to /api/users, should return 404", async () => {
    await supertest(app).get("/api/users").expect(404);
  });
});
