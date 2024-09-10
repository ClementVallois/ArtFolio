import { isUUID } from 'class-validator';

export class CategoryId {
  constructor(private readonly value: string) {
    if (!isUUID(value, 4)) throw new Error('Invalid category ID');
  }
  toString(): string {
    return this.value;
  }
}
