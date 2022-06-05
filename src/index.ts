import chalk from "chalk";
import { configureExpress } from "./config/config-express-app";

const PORT = process.env.PORT || 3000;
const app = configureExpress(null);

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
