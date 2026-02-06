type LogLevel = "info" | "error" | "warn" | "debug";

class Logger {
  private static instance: Logger;

  constructor() {
    if (Logger.instance) {
      return Logger.instance;
    }
    Logger.instance = this;
  }

  private log(level: LogLevel, message: string, metadata?: object) {
    const logObject = {
      level,
      message,
      timestamp: new Date().toISOString(),
      ...metadata,
    };

    console.log(JSON.stringify(logObject));
  }

  info(message: string, metadata?: object) {
    this.log("info", message, metadata);
  }

  error(message: string, metadata?: object) {
    this.log("error", message, metadata);
  }

  warn(message: string, metadata?: object) {
    this.log("warn", message, metadata);
  }

  debug(message: string, metadata?: object) {
    this.log("debug", message, metadata);
  }
}

const logger = new Logger();
export default logger;
