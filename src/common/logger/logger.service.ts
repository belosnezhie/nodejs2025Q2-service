import {
  LoggerService,
  Injectable,
  ConsoleLogger,
  type LogLevel,
} from '@nestjs/common';
import 'dotenv/config';

const LOG_LEVELS = ['verbose', 'debug', 'log', 'warn', 'error', 'fatal'];

@Injectable()
export class CustomLoggerService
  extends ConsoleLogger
  implements LoggerService
{
  logLevel: number = Number(process.env.LOG_LEVEL) || 6;

  constructor(context?: string) {
    super();
    this.setLogLevels(['verbose', 'debug', 'log', 'warn', 'error', 'fatal']);
    this.setContext(context);
  }

  checkLevel(level: LogLevel): boolean {
    const index = LOG_LEVELS.indexOf(level);
    return index <= this.logLevel;
  }

  log(message: string) {
    if (this.checkLevel('log')) {
      super.log(message);
    }
  }

  fatal(message: any) {
    if (this.checkLevel('fatal')) {
      super.fatal(message);
    }
  }

  error(message: any) {
    if (this.checkLevel('error')) {
      super.error(message);
    }
  }

  warn(message: any) {
    if (this.checkLevel('warn')) {
      super.warn(message);
    }
  }

  debug(message: any) {
    if (this.checkLevel('debug')) {
      super.debug(message);
    }
  }

  verbose(message: any) {
    if (this.checkLevel('verbose')) {
      super.verbose(message);
    }
  }
}
