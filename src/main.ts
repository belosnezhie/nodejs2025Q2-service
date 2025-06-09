import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { readFileSync } from 'fs';
import { join } from 'path';
import { parse } from 'yaml';
import { SwaggerModule } from '@nestjs/swagger';
import 'dotenv/config';
import 'reflect-metadata';

const PORT = process.env.PORT || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
    }),
  );

  const yamlFile = readFileSync(join(__dirname, '..', 'doc/api.yaml'), 'utf8');
  SwaggerModule.setup('/docs', app, parse(yamlFile));

  await app.listen(PORT);
  console.log(`App is running on http://localhost:${PORT}/`);
  console.log(`To test API use http://localhost:${PORT}/docs`);
}
bootstrap();
