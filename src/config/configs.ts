import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: process.env.PORT ?? 4000,
  host: process.env.HOST ?? "localhost",
  nodeEnv: process.env.NODE_ENV ?? "",
  whiteListedOrigin: process.env.WHITE_LISTED_ORIGIN ?? "http://localhost:3000",
  databaseUrl: process.env.DATABASE_URL ?? "",
};
