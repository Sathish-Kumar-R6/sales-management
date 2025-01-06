import fs from "fs";
import csv from "csv-parser";
import { SalesCsvType } from "../services/sales.types";

export async function parseCSV(filePath: string): Promise<SalesCsvType[]> {
  const results: SalesCsvType[] = [];

  return new Promise((resolve, reject) => {
    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        return reject(new Error("File not found or inaccessible"));
      }

      const readStream = fs.createReadStream(filePath);
      readStream
        .on("error", () => {
          reject(
            new Error("Failed to read the file. Ensure it is a valid CSV file"),
          );
        })
        .pipe(csv())
        .on("data", (data) => {
          results.push(data);
        })
        .on("end", () => resolve(results))
        .on("error", () =>
          reject(new Error("An error occurred while parsing the CSV file")),
        );
    });
  });
}
