import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ToBoolean } from 'src/presentation/decorators/toBoolean/toBoolean.decorator';
import { Transform } from 'class-transformer';

export class CreatePostDto {
  @ApiProperty({
    description: 'Indicates whether the post should be pinned or not',
    required: true,
  })
  @IsBoolean({ message: '$property must be a boolean' })
  @IsNotEmpty({ message: '$property must not be empty' })
  @ToBoolean()
  isPinned: boolean;

  @ApiProperty({
    description: 'The description of the post',
    maxLength: 500,
    required: false,
  })
  @IsString({ message: '$property must be a string' })
  @MaxLength(500, {
    message: '$property must be less than $constraint1 characters',
  })
  @Transform(({ value }) => value?.trim())
  description?: string;

  @ApiProperty({
    description: 'The ID of the artist creating the post',
    required: false,
    example: '12345678-abcd-efgh-ijkl-123456789012',
  })
  @IsOptional()
  @IsNotEmpty({ message: '$property must not be empty' })
  @IsUUID('4', { message: '$property must be a valid UUID' })
  artistId?: string;
}
