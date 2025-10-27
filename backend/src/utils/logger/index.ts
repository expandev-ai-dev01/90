/**
 * @summary
 * Logging utility for structured application logs
 *
 * @module utils/logger
 */

import { config } from '@/config';

export enum LogLevel {
  ERROR = 'error',
  WARN = 'warn',
  INFO = 'info',
  DEBUG = 'debug',
}

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  context?: any;
}

/**
 * @summary
 * Formats and outputs log entry
 *
 * @function log
 * @module utils/logger
 *
 * @param {LogLevel} level - Log level
 * @param {string} message - Log message
 * @param {any} [context] - Additional context
 *
 * @returns {void}
 */
function log(level: LogLevel, message: string, context?: any): void {
  const entry: LogEntry = {
    level,
    message,
    timestamp: new Date().toISOString(),
    context,
  };

  const output = JSON.stringify(entry);

  switch (level) {
    case LogLevel.ERROR:
      console.error(output);
      break;
    case LogLevel.WARN:
      console.warn(output);
      break;
    case LogLevel.INFO:
      console.info(output);
      break;
    case LogLevel.DEBUG:
      console.debug(output);
      break;
  }
}

export const logger = {
  error: (message: string, context?: any) => log(LogLevel.ERROR, message, context),
  warn: (message: string, context?: any) => log(LogLevel.WARN, message, context),
  info: (message: string, context?: any) => log(LogLevel.INFO, message, context),
  debug: (message: string, context?: any) => log(LogLevel.DEBUG, message, context),
};
