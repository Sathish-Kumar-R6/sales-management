import { Request, Response } from "express";

export const notFoundMiddleware = (_req: Request, res: Response): void => {
  res.status(404).json({ status: "error", message: "Route not found" });
};
