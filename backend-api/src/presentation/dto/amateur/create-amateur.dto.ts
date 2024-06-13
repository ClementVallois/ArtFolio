import {
  IsEnum,
  IsISO8601,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateAmateurDto {
  @ApiProperty({
    description: 'The first name of the amateur',
    example: 'John',
    required: true,
    maxLength: 50,
  })
  @IsNotEmpty({ message: '$property is required' })
  @IsString({ message: '$property must be a string' })
  @MaxLength(50, {
    message: '$property must be less than $constraint1 characters',
  })
  firstName: string;

  @ApiProperty({
    description: 'The last name of the amateur',
    example: 'Doe',
    required: true,
    maxLength: 50,
  })
  @IsNotEmpty({ message: '$property is required' })
  @IsString({ message: '$property must be a string' })
  @MaxLength(50, {
    message: '$property must be less than $constraint1 characters',
  })
  lastName: string;

  @ApiProperty({
    description: 'The birth date of the amateur',
    example: '1990-01-01',
    required: true,
  })
  @IsNotEmpty({ message: '$property is required' })
  @IsISO8601({ strict: true }, { message: '$property must be a date' })
  birthDate: Date;

  @ApiProperty({
    description: 'The username of the amateur',
    example: 'johndoe',
    required: true,
    maxLength: 50,
  })
  @IsNotEmpty({ message: '$property is required' })
  @IsString({ message: '$property must be a string' })
  @MaxLength(50, {
    message: '$property must be less than $constraint1 characters',
  })
  username: string;

  @ApiPropertyOptional({
    description: 'The description of the amateur',
    example: 'I am an art enthusiast',
    maxLength: 500,
  })
  @IsOptional()
  @IsString({ message: '$property must be a string' })
  @MaxLength(500, {
    message: '$property must be less than $constraint1 characters',
  })
  description: string;

  @ApiProperty({
    description: 'The status of the amateur',
    example: 'active',
    required: true,
    enum: ['active', 'inactive'],
  })
  @IsEnum(['active', 'inactive'], {
    message: '$property must be active or inactive',
  })
  @IsNotEmpty({ message: '$property is required' })
  status: string;

  @ApiProperty({
    description: 'The role of the user',
    example: 'amateur',
    required: true,
    enum: ['artist', 'amateur'],
  })
  @IsEnum(['artist', 'amateur'], {
    message: '$property must be artist or user',
  })
  @IsNotEmpty({ message: '$property is required' })
  role: string;

  @ApiProperty({
    description: 'The Auth0 ID of the amateur',
    example: 'auth0|123456789',
    required: true,
  })
  @IsNotEmpty({ message: '$property is required' })
  @IsString({ message: '$property must be a string' })
  auth0Id: string;
}
