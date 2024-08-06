import { ApiProperty, OmitType } from '@nestjs/swagger';
import { CreatePersonalDataRequestDto } from './create-personal-data-request.dto';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class UpdatePersonalDataRequestDto extends OmitType(
  CreatePersonalDataRequestDto,
  ['userId'] as const,
) {
  @ApiProperty({
    description: 'The status of the Personal Data Request',
    enum: ['requested', 'processed'],
    example: 'requested',
    required: true,
  })
  @IsEnum(['requested', 'processed'], {
    message: '$property must be requested or processed',
  })
  @IsNotEmpty({ message: '$property is required' })
  status: string;
}
