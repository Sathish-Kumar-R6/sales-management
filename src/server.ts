import app from "./app";
import dotenv from "dotenv";
import { config } from "./config/configs";
import { logger } from "./utils/logger";

dotenv.config();

app.listen(config.port, () => {
  logger.info(`Server running on http://${config.host}:${config.port}`);
});
