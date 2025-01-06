import express from "express";
import cors from "cors";
import apiRoutes from "./routes/api";
import { notFoundMiddleware } from "./middlewares/notFoundMiddleware";
import { errorMiddleware } from "./middlewares/errorMiddleware";
import healthCheckRouter from "./routes/healthCheck";
import { scheduleCron } from "./jobs/data-reload-cron";
import { loggerMiddleware } from "./utils/logger";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(healthCheckRouter);
app.use(loggerMiddleware);
scheduleCron();
app.use("/api", apiRoutes);
app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
