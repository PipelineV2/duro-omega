import { Router, Application } from "express";

const route = Router();

route.get("/", (req, res, next) => {
  res.json({ message: "Welcome to Duro", success: true });
});

export default (app: Application) => {
  app.use(route);
};
