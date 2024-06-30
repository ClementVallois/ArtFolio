import { isUUID } from 'class-validator';

export class ArtistId {
  constructor(private readonly value: string) {
    if (!isUUID(value, 4)) throw new Error('Invalid artist ID');
  }
  toString(): string {
    return this.value;
  }
}
