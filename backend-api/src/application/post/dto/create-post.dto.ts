import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreatePostDto {
  @IsBoolean({ message: '$property must be a boolean' })
  @IsNotEmpty({ message: '$property must not be empty' })
  isPinned: boolean;

  @IsOptional()
  @IsString({ message: '$property must be a string' })
  @MaxLength(500, {
    message: '$property must be less than $constraint1 characters',
  })
  description: string;
}
