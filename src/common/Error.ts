import { Request, Response, NextFunction } from "express";

export abstract class CustomError extends Error {
  abstract statusCode: number;

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, CustomError.prototype);
  }

  abstract serializeErrors(): {
    message: string;
    field?: string;
  }[];
}

export class NotFoundError extends CustomError {
  statusCode = 404;

  constructor(private reason?: string) {
    super("Resource not found");

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors() {
    return [{ message: this?.reason || "Not Found" }];
  }
}

export class UserError extends CustomError {
  statusCode = 400;

  constructor(private reason = "invalid request") {
    super(reason);

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors() {
    return [{ message: this.reason }];
  }
}

export class DatabaseConnectionError extends CustomError {
  statusCode = 500;
  reason = "Error requesting to database";

  constructor() {
    super("Error requesting to database");

    // Cus it extends Error
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors() {
    return [{ message: this.reason }];
  }
}

export class UnauthorizedError extends CustomError {
  statusCode = 401;

  constructor() {
    super("Unauthorized Request");

    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }

  serializeErrors() {
    return [{ message: "Not Authorized" }];
  }
}

export const errorHandler = (
  err: Error,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    return response
      .status(err.statusCode)
      .json({ errors: err.serializeErrors() });
  }

  console.error(err);
  return response
    .status(500)
    .json({ errors: [{ message: "something broke" }] });
};
