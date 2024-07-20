import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsString({ message: '$property must be a string' })
  name: string;

  @IsNotEmpty({ message: '$property must not be empty' })
  @IsString({ message: '$property must be a string' })
  @MaxLength(500, {
    message: '$property must not exceed $constraint1 characters',
  })
  description: string;

  @IsOptional()
  @IsString({ message: '$property must be a string' })
  userId: string;

  @IsOptional()
  @IsString({ message: '$property must be a string' })
  postId: string;
}
