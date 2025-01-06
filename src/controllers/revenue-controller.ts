import { Request, Response } from "express";
import { RevenueFilterTypes } from "./revenue.types";
import { calculateRevenue } from "../services/revenue-service";

export async function getRevenue(req: Request, res: Response) {
  const { start_date, end_date, product_id, category, region } = req.query;
  const filters: RevenueFilterTypes = {};

  // Apply date range filter
  if (start_date && end_date) {
    filters.order = {
      date: {
        gte: new Date(start_date as string),
        lte: new Date(end_date as string),
      },
    };
  }

  // Apply product filter
  if (product_id && typeof product_id === "string") {
    filters.product_id = product_id;
  }

  // Apply category filter
  if (category && typeof category === "string") {
    filters.product = {
      category,
    };
  }

  // Apply region filter
  if (region && typeof region === "string") {
    filters.order = {
      ...filters.order,
      region,
    };
  }

  const totalRevenue = await calculateRevenue(filters);
  const roundedRevenue = totalRevenue.toFixed(2);
  const message = `Total revenue: ${roundedRevenue}`;
  res.status(200).json({ success: true, message });
}
