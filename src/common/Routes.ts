import { Router, Application } from "express";
import Auth from "../Auth/AuthApi";

const route = Router();

route.get("/", (req, res, next) => {
  res.json({ message: "Welcome to Duro", success: true });
});

export default (app: Application) => {
  app.use(route);
  app.use("/v1/auth", Auth);
};
