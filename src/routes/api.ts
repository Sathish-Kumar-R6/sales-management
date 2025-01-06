import express from "express";
import { refreshDataController } from "../controllers/refresh-data-controller";
import { refreshValidator } from "../validators/refresh-validator";
import { revenueValidator } from "../validators/revenue-validator";
import { getRevenue } from "../controllers/revenue-controller";

const router = express.Router();

router.post("/refresh", refreshValidator, refreshDataController);
router.get("/revenue-details", revenueValidator, getRevenue);

export default router;
