import { NotFoundException } from '@nestjs/common';

export const validateNotFound = <T>(
  value: T | null | undefined,
  errorMessage = 'Resource not found',
): T => {
  if (value === undefined || value === null) {
    throw new NotFoundException(errorMessage);
  }
  return value;
};
