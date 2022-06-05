import { json } from "body-parser";
import cors from "cors";

export default (app: any) => {
  app.use(json());
  app.use(cors());
};
