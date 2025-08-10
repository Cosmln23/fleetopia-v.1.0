import winston from 'winston';

const isProd = process.env.NODE_ENV === 'production';

export const logger = winston.createLogger({
  level: isProd ? 'info' : 'debug',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(({ level, message, timestamp }) => `${timestamp} ${level.toUpperCase()}: ${message}`),
  ),
  transports: [
    new winston.transports.Console(),
    ...(isProd ? [new winston.transports.File({ filename: 'logs/error.log', level: 'error' })] : []),
  ],
});

export default logger;


