import { body } from "express-validator";

export const refreshValidator = [
  body("filePath")
    .isString()
    .withMessage("File path must be a string")
    .notEmpty()
    .withMessage("File path is required"),
];
