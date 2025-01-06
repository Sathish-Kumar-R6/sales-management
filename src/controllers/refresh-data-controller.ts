import { Request, Response } from "express";
import { refreshData } from "../services/data-refresh-service";

export async function refreshDataController(req: Request, res: Response) {
  const filePath = req.body.filePath;
  await refreshData(filePath);
  res.status(200).json({
    success: true,
    message: "Data refresh initiated successfully.",
  });
}
