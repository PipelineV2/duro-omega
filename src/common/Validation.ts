import { Request, Response, NextFunction } from "express";
import Joi from "joi";

export class ValidationMiddleware {
  public static validateSignup(req: Request, res: Response, next: NextFunction): void {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      const errorMessage = error.details.map((detail) => detail.message).join(", ");
      res.status(400).json({ error: errorMessage });
    } else {
      next();
    }
  }

  public static validateLogin(req: Request, res: Response, next: NextFunction): void {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      const errorMessage = error.details.map((detail) => detail.message).join(", ");
      res.status(400).json({ error: errorMessage });
    } else {
      next();
    }
  }

  public static validateJoinQueue(req: Request, res: Response, next: NextFunction): void {
    const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      message: Joi.string().required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      const errorMessage = error.details.map((detail) => detail.message).join(", ");
      res.status(400).json({ error: errorMessage });
    } else {
      next();
    }
  }
  
  // Add validation methods for other routes here

}
