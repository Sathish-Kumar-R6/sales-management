import { body } from "express-validator";
import { handleValidationErrors } from "../middlewares/validationError";

export const refreshValidator = [
  body("filePath").isString().withMessage("File path must be a string"),
  handleValidationErrors,
];
