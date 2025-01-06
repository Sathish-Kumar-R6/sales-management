import { query } from "express-validator";
import { handleValidationErrors } from "../middlewares/validationError";

export const revenueValidator = [
  query("start_date").isDate().optional().withMessage("Start Date is required"),
  query("end_date").isDate().optional().withMessage("End date is required"),
  query("product_id").isString().optional(),
  query("category").isString().optional(),
  query("region").isString().optional(),
  handleValidationErrors,
];
