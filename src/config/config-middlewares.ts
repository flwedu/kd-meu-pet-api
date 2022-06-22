import "dotenv/config";
import { json } from "body-parser";
import cors from "cors";
import sessions from "express-session";
import cookieParser from "cookie-parser";
import { catchError } from "../input/middlewares/catch-error";

const oneDay = 1000 * 60 * 60 * 24;
const SESSION_SECRET = process.env.SESSIONS_SECRET || "secret";

const configureMiddlewares = (app: any) => {
  app.use(json());
  app.use(cors());

  app.use(
    sessions({
      secret: SESSION_SECRET,
      saveUninitialized: true,
      cookie: { maxAge: oneDay },
      resave: false,
    })
  );
  app.use(cookieParser());
  app.use(catchError);
};

export { configureMiddlewares };
