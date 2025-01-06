import { Router } from "express";

const healthCheckRouter = Router();

healthCheckRouter.all("/health-check", (_, res) => {
  res.status(200).json({ message: "Hello from Sales DB" });
});

export default healthCheckRouter;
