import { isUUID } from 'class-validator';

export class UserId {
  constructor(private readonly value: string) {
    if (!isUUID(value, 4)) throw new Error('Invalid user ID');
  }
  toString(): string {
    return this.value;
  }
}
