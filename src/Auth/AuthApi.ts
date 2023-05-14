import { Router } from "express";
import { registerValidation } from "./AuthValidator";

const router = Router();

router.post("/signup", registerValidation, (req, res, next) => {
  try{return res.status(201).json({
    status: true,
    message: "sucessfully signed up"
  });
  } catch (err) {
    next(err)
  }
});

export default router;
