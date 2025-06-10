import { NestFactory } from '@nestjs/core';
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

  process.on('uncaughtException', (error) => {
    logger.error(`Uncaught Exception: ${error.message}`);
  });

  process.on('unhandledRejection', (reason: any) => {
    logger.error(`Unhandled Rejection: ${reason}`);
  });

  app.useGlobalFilters(new CustomExceptionsFilter(logger));

  await app.listen(PORT);

  logger.log(`App is running on http://localhost:${PORT}/`);
  logger.log(`To test API use http://localhost:${PORT}/docs`);
}
bootstrap();
