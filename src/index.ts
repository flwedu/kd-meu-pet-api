import chalk from "chalk";
import { configureExpress } from "./config/config-express-app";
import getInMemoryRepositories from "./config/configure-repositories-in-memory";
import { makeBcryptEncryptor } from "./security/bcrypt";

const PORT = process.env.PORT || 3000;
const SECRET = process.env.SECRET || "secret";

const repositories = getInMemoryRepositories();
const encryptor = makeBcryptEncryptor(SECRET);
const app = configureExpress(repositories, encryptor);

function logProcessStart() {
  const host = "http://localhost";
  console.log(
    `Server is running at ${chalk.blue(host)}:${chalk.green(PORT)} 🚀`
  );
}

app.listen(PORT, logProcessStart);

function gracefullyShutdown() {
  console.log("Shutting down...");

  process.exit(0);
}

process.on("SIGTERM", gracefullyShutdown);
