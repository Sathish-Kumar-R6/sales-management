import fs from "fs";
import csv from "csv-parser";
import { SalesCsvType } from "../services/sales.types";

export async function parseCSV(filePath: string): Promise<SalesCsvType[]> {
  const results: SalesCsvType[] = [];
  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", () => resolve(results))
      .on("error", (err) => reject(err));
  });
}
