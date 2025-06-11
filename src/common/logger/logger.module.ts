import { Module } from '@nestjs/common';
import { CustomLoggerService } from './logger.service';
import { CustomExceptionsFilter } from './logger.exeption';

@Module({
  providers: [CustomLoggerService, CustomExceptionsFilter],
  exports: [CustomLoggerService, CustomExceptionsFilter],
})
export class LoggerModule {}
