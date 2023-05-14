import { Response, NextFunction, Request } from "express";
import * as Joi from "joi";
import { UserError } from "./Error";

export const successRes = (
  res: Response,
  code: number,
  msg: string,
  data: any
) => {
  return res.status(code || 200).json({
    status: true,
    message: msg,
    data,
  });
};

export const validationMiddlewareFactory =
  (schema: Joi.Schema, entityTobeValidated = "body") =>
  async (
    request: any,
    response: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      /**
       * @todo- fix type for request
       */
      const entity = request[entityTobeValidated];

      const { error } = await schema.validateAsync(entity);

      if (error) {
        throw new UserError(error.message);
      }

      next();
    } catch (error) {
      next(new UserError((error as Error).message));
    }
  };
