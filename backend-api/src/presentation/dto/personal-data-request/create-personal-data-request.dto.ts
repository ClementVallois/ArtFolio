import { IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePersonalDataRequestDto {
  @ApiProperty({
    description: 'The UUID of the user',
    example: '12345678-abcd-efgh-ijkl-123456789012',
    required: true,
  })
  @IsUUID('4', { message: '$property must be a valid uuid' })
  @IsNotEmpty({ message: '$property is required' })
  userId: string;
}
