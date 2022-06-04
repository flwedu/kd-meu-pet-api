import app from "./config/express-app";

const PORT = process.env.PORT || 3000;

function logProcessStart() {
  const host = "http://localhost";
  console.log(`Server is running at ${host}:${PORT} 🚀`);
}

app.listen(PORT, logProcessStart);

function gracefullyShutdown() {
  console.log("Shutting down...");

  process.exit(0);
}

process.on("SIGTERM", gracefullyShutdown);
