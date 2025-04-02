import {IStreamLogger} from "../../core/handlers/strem-logger.interface";

export class ConsoleLogger implements IStreamLogger {
  //singleton
  static logger: ConsoleLogger;
  public static getInstance() {
    if (!ConsoleLogger.logger) {
      ConsoleLogger.logger = new ConsoleLogger();
    }
    return ConsoleLogger.logger;
  } 
  end(): void {
    console.log('end')
  }
  error(...args: any[]): void {
    console.log('error', ...args)
  }
  log(...args: any[]): void {
    console.log('log', ...args)
  }
  
}