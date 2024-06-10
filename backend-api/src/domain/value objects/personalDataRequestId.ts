import { isUUID } from 'class-validator';

export class PersonalDataRequestId {
  constructor(private readonly value: string) {
    if (!isUUID(value, 4)) throw new Error('Invalid personal data request ID');
  }
  toString(): string {
    return this.value;
  }
}
