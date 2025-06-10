import { LoggerService, Injectable, ConsoleLogger } from '@nestjs/common';

@Injectable()
export class CustomLogger extends ConsoleLogger implements LoggerService {
  constructor(context?: string) {
    super();
    this.setLogLevels(['log', 'fatal', 'error', 'warn', 'debug', 'verbose']);
    this.setContext(context);
  }

  log(message: string) {
    super.log(message);
  }

  fatal(message: any) {
    super.fatal(message);
  }

  error(message: any) {
    super.error(message);
  }

  warn(message: any) {
    super.warn(message);
  }

  debug(message: any) {
    super.debug(message);
  }

  verbose(message: any) {
    super.verbose(message);
  }
}
