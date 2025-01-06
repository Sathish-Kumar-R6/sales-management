import { createLogger, format, transports } from "winston";
import path from "path";
import { Request, Response, NextFunction } from "express";
import { config } from "../config/configs";

// Define log levels
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const env = config.nodeEnv || "development";

const logFormat = format.combine(
  format.colorize(),
  format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  format.printf(
    ({ timestamp, level, message }) => `[${timestamp}] ${level}: ${message}`,
  ),
);

// Create a logger instance
const logger = createLogger({
  levels,
  level: env === "development" ? "debug" : "warn",
  format: logFormat,
  transports: [
    new transports.Console(),
    new transports.File({
      filename: path.join(__dirname, "../../logs/error.log"),
      level: "error",
    }),
    new transports.File({
      filename: path.join(__dirname, "../../logs/combined.log"),
    }),
  ],
});

const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  res.on("finish", () => {
    logger.info({
      message: "Request processed",
      response: { statusCode: res.statusCode, headers: res.headersSent },
      request: {
        method: req.method,
        url: req.originalUrl,
        headers: req.headers,
        query: req.query,
        body: req.body,
      },
      duration: Date.now() - start,
    });
  });
  next();
};

export { logger, loggerMiddleware };
