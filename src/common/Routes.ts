import { Router, Application } from "express";
import { Model } from "mongoose";
import { QueueController } from "../queue/interfaces/controllers/QueueController";
import { AuthController } from "../authentication/interfaces/controllers/AuthController";
import { UserRepository } from "../authentication/infrastructure/UserRepository";
import { AuthenticationService } from "../authentication/domain/services/AuthService";
import { QueueRepository } from "../queue/infrastructure/QueueRepository";
import { QueueService } from "../queue/domain/services/QueueService";
import { authenticateJwt } from "../common/PassportConfig";
import { ValidationMiddleware } from "../common/Validation";
import { User, UserModel, UserDocument } from "../authentication/domain/models/User";
import { QueueModel, QueueDocument } from "../queue/domain/models/Queue";

const route = Router();

route.get("/", (req, res, next) => {
  res.json({ message: "Welcome to Duro", success: true });
});

export default (app: Application) => {
  app.use(route);
};

const queueModel = QueueModel;
const userModel = UserModel;
const userRepository = new UserRepository(userModel);
const queueRepository = new QueueRepository(queueModel);
const queueService = new QueueService(queueRepository);
const queueController = new QueueController(queueService);

const authService = new AuthenticationService(userRepository);
const authController = new AuthController(authService);

// Unauthenticated Routes
route.post("/auth/signup", ValidationMiddleware.validateSignup, authController.register);
route.post("/auth/login", ValidationMiddleware.validateLogin, authController.login);
route.post("/queue/join/:id", ValidationMiddleware.validateJoinQueue, queueController.joinQueue);
route.get("/queue/:id/display", queueController.displayQueue);

// Authenticated Routes
route.get("/queue", authenticateJwt, queueController.getQueue);
route.post("/queue", authenticateJwt, queueController.createQueue);
route.delete("/queue/:id", authenticateJwt, queueController.processClient);

export const routes = route;
