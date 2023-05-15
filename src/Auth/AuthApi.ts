import { Router } from "express";
import { registerValidation } from "./AuthValidator";
import AuthService from "./AuthService";

const router = Router();

router.post("/signup", registerValidation, AuthService.signup);

export default router;
