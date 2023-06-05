import { Router } from "express";
import { registerValidation, loginValidation } from "./AuthValidator";
import AuthService from "./AuthService";

const router = Router();

router.post("/signup", registerValidation, AuthService.signup);
router.post("/login", loginValidation, AuthService.login);

export default router;
