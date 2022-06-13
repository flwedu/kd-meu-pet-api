import { Session } from "express-session";

export type LoginSession = Session & { loggedId: string };
