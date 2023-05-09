// external modules
import express, { json, urlencoded } from "express";
import "express-async-errors";
import logger from "morgan";
import cors from "cors";
import { NotFoundError, errorHandler } from "./common/Error";

// internal modules
import router from "./common/Routes";

const app = express();
app.set("trust proxy", true);

app.use(json());
app.use(cors());
app.use(logger("dev"));
app.use(urlencoded({ extended: true }));

// Initialize routes
router(app);

app.all("*", () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
