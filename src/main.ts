import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { readFileSync } from 'fs';
import { join } from 'path';
import { parse } from 'yaml';
import { SwaggerModule } from '@nestjs/swagger';
import 'dotenv/config';
import 'reflect-metadata';
import { CustomLoggerService } from './common/logger/logger.service';
import { CustomExceptionsFilter } from './common/logger/logger.exeption';

const PORT = process.env.PORT || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
    }),
  );

  app.useLogger(app.get(CustomLoggerService));
  const logger = app.get(CustomLoggerService);

  const yamlFile = readFileSync(join(__dirname, '..', 'doc/api.yaml'), 'utf8');
  SwaggerModule.setup('/docs', app, parse(yamlFile));

  process.on('uncaughtException', (reason) => {
    logger.log('Uncaught Exception');
    logger.error(reason.message);
    throw reason;
  });

  process.on('unhandledRejection', (reason) => {
    logger.log('Unhandled Rejection');
    logger.error(reason);
  });

  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(new CustomExceptionsFilter(logger, httpAdapter));

  await app.listen(PORT);

  logger.log(`App is running on http://localhost:${PORT}/`);
  logger.log(`To test API use http://localhost:${PORT}/docs`);
}
bootstrap();
