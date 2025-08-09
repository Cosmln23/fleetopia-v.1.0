import { createLogger, format, transports } from "winston";

const isProd = process.env.NODE_ENV === "production";

const logger = createLogger({
  level: isProd ? "info" : "debug",
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.printf(({ level, message, timestamp }) => {
      return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
    })
  ),
  transports: [
    new transports.Console(),
    ...(isProd
      ? [
          new transports.File({
            filename: "logs/error.log",
            level: "error",
          }),
        ]
      : []),
  ],
});

export default logger;


