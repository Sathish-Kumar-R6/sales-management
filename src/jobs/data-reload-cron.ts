import { refreshData } from "../services/data-refresh-service";
import cron from "node-cron";
import { logger } from "../utils/logger";

// Scheduled Data Refresh (Daily at midnight)

export function scheduleCron() {
  cron.schedule("0 0 * * *", async () => {
    try {
      logger.info("Scheduled data refresh started.");
      await refreshData("./data/sales.csv");
      logger.info("Scheduled data refresh completed successfully.");
    } catch (error) {
      logger.error("Scheduled data refresh failed:", error);
    }
  });
}
