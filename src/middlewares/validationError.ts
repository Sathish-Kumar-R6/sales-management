import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

export const handleValidationErrors = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const formattedErrors = errors.array().map((error) => ({
      message: error.msg,
    }));

    res.status(400).json({
      status: "error",
      errors: formattedErrors,
    });
    return;
  }
  next();
};
