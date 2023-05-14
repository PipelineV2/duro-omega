import express, { Application, json, urlencoded } from "express";
import "express-async-errors";
import logger from "morgan";
import cors from "cors";
import { NotFoundError, errorHandler } from "./common/Error";
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { configurePassport } from "./common/PassportConfig";
import { routes } from "./common/Routes";

const app: Application = express();
app.set("trust proxy", true);

app.use(json());
app.use(cors());
app.use(logger("dev"));
app.use(urlencoded({ extended: true }));

const configuredPassport = configurePassport();
app.use(configuredPassport.initialize());

// Initialize routes
app.use(routes);

app.all("*", () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
