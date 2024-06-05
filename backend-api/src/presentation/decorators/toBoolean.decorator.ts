import { applyDecorators } from '@nestjs/common';
import { Transform } from 'class-transformer';
import { ParseBooleanPipe } from '../../infrastructure/common/pipes/parseBooleanPipe';

export function ToBoolean() {
  return applyDecorators(
    Transform(({ value }) => new ParseBooleanPipe().transform(value)),
  );
}
