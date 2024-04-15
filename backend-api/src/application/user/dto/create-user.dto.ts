import {
  IsEnum,
  IsISO8601,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: '$property is required' })
  @IsString({ message: '$property must be a string' })
  @MaxLength(50, {
    message: '$property must be less than $constraint1 characters',
  })
  firstName: string;

  @IsNotEmpty({ message: '$property is required' })
  @IsString({ message: '$property must be a string' })
  @MaxLength(50, {
    message: '$property must be less than $constraint1 characters',
  })
  lastName: string;

  @IsNotEmpty({ message: '$property is required' })
  @IsISO8601({ strict: true }, { message: '$property must be a date' })
  birthDate: Date;

  @IsNotEmpty({ message: '$property is required' })
  @IsString({ message: '$property must be a string' })
  @MaxLength(50, {
    message: '$property must be less than $constraint1 characters',
  })
  username: string;

  @IsOptional()
  @IsString({ message: '$property must be a string' })
  @MaxLength(500, {
    message: '$property must be less than $constraint1 characters',
  })
  description: string;

  @IsEnum(['active', 'inactive', 'deleted'], {
    message: '$property must be active, inactive or deleted',
  })
  @IsNotEmpty({ message: '$property is required' })
  status: string;

  @IsEnum(['artist', 'user'], {
    message: '$property must be artist or user',
  })
  @IsNotEmpty({ message: '$property is required' })
  role: string;

  @IsNotEmpty({ message: '$property is required' })
  @IsString({ message: '$property must be a string' })
  auth0Id: string;
}
