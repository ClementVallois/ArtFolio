import {
  IsDate,
  IsEnum,
  IsNotEmpty,
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
  @IsDate({ message: '$property must be a date' })
  birthDate: Date;

  @IsNotEmpty({ message: '$property is required' })
  @IsString({ message: '$property must be a string' })
  @MaxLength(50, {
    message: '$property must be less than $constraint1 characters',
  })
  username: string;

  @IsNotEmpty({ message: '$property is required' })
  @IsString({ message: '$property must be a string' })
  @MaxLength(500, {
    message: '$property must be less than $constraint1 characters',
  })
  description: string;

  @IsEnum(['active', 'inactive', 'deleted'], {
    message: '$property must be ACTIVE, INACTIVE or DELETED',
  })
  @IsNotEmpty({ message: '$property is required' })
  status: string;

  @IsEnum(['artist', 'user', 'moderator'], {
    message: '$property must be ARTIST, USER or MODERATOR',
  })
  @IsNotEmpty({ message: '$property is required' })
  role: string;

  // TODO : Add auth0Id validation when auth0 integration is ready
  auth0Id;
}
