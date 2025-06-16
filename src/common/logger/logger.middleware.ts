import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { CustomLoggerService } from './logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: CustomLoggerService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl, query, body } = req;
    const start = Date.now();

    this.logger.log(
      `Incoming Request: ${method} ${originalUrl} | Query: ${JSON.stringify(query)} | Body: ${JSON.stringify(body)}`,
    );

    res.on('finish', () => {
      const duration = Date.now() - start;
      this.logger.log(
        `Response: ${res.statusCode} | ${method} ${originalUrl} | Duration: ${duration}ms`,
      );
    });

    next();
  }
}
