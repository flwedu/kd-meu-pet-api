import getInMemoryRepositories from "./config/configure-repositories-in-memory";
import { ExpressServer } from "./config/express-server";
import { makeBcryptEncryptor } from "./security/bcrypt";

const PORT = process.env.PORT || 3000;
const SECRET = process.env.SECRET || "secret";

const repositories = getInMemoryRepositories();
const encryptor = makeBcryptEncryptor(SECRET);
const app = new ExpressServer(repositories, encryptor);

app.start(Number(PORT));

function gracefullyShutdown() {
  console.log("Shutting down...");

  process.exit(0);
}

process.on("SIGTERM", gracefullyShutdown);
