import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateDataRequestDto {
  @IsUUID('4', { message: '$property must be a valid uuid' })
  @IsNotEmpty({ message: '$property is required' })
  user: string;
}
