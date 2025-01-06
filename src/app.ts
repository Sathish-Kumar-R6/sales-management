import express from "express";
import cors from "cors";
import apiRoutes from "./routes/api";
import { notFoundMiddleware } from "./middlewares/notFoundMiddleware";
import { errorMiddleware } from "./middlewares/errorMiddleware";
import healthCheckRouter from "./routes/healthCheck";
import { scheduleCron } from "./jobs/data-reload-cron";
import { loggerMiddleware } from "./utils/logger";
import { config } from "./config/configs";
import swaggerUi from "swagger-ui-express";
import path from "path";
import fs from "fs";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(loggerMiddleware);
const swaggerFile = path.join(__dirname, "../swagger.json");
const swaggerDocument = JSON.parse(fs.readFileSync(swaggerFile, "utf8"));
if (config.nodeEnv === "development") {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

scheduleCron();
app.use(healthCheckRouter);
app.use("/api", apiRoutes);
app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
