import { isUUID } from 'class-validator';

export class PostId {
  constructor(private readonly value: string) {
    if (!isUUID(value, 4)) throw new Error('Invalid post ID');
  }
  toString(): string {
    return this.value;
  }
}
