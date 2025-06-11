import {
  LoggerService,
  Injectable,
  ConsoleLogger,
  type LogLevel,
} from '@nestjs/common';
import 'dotenv/config';

const LOG_LEVELS: LogLevel[] = [
  'verbose',
  'debug',
  'log',
  'warn',
  'error',
  'fatal',
];

@Injectable()
export class CustomLoggerService
  extends ConsoleLogger
  implements LoggerService
{
  private logLevel: number;

  constructor(context?: string) {
    super();
    this.setLogLevels(['verbose', 'debug', 'log', 'warn', 'error', 'fatal']);
    this.setContext(context);
    this.logLevel = Number(process.env.LOG_LEVEL) || 6;
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

  private checkLevel(level: LogLevel): boolean {
    return LOG_LEVELS.indexOf(level) <= this.logLevel;
  }
}
