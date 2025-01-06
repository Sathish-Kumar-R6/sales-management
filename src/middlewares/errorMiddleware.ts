import type { ErrorRequestHandler } from "express";
import { logger } from "../utils/logger";

export const errorMiddleware: ErrorRequestHandler = (err, _req, res): void => {
  logger.error(err.message);
  res.status(500).json({ status: "error", message: err.message });
};
