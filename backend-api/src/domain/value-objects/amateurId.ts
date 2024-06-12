import { isUUID } from 'class-validator';

export class AmateurId {
  constructor(private readonly value: string) {
    if (!isUUID(value, 4)) throw new Error('Invalid amateur ID');
  }
  toString(): string {
    return this.value;
  }
}
