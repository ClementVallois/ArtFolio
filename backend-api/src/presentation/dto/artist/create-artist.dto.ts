import { Type } from 'class-transformer';
import {
  IsEnum,
  IsISO8601,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CreatePostDto } from 'src/presentation/dto/post/create-post.dto';
import { ArtistCategoriesDto } from './artist-categories.dto';

export class CreateArtistDto {
  @ApiProperty({
    description: 'The first name of the artist',
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
    description: 'The last name of the artist',
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
    description: 'The birth date of the artist',
    example: '1990-01-01',
    required: true,
  })
  @IsNotEmpty({ message: '$property is required' })
  @IsISO8601({ strict: true }, { message: '$property must be a date' })
  birthDate: string;

  @ApiProperty({
    description: 'The username of the artist',
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
    description: 'The description of the artist',
    example: 'I am a talented artist',
    maxLength: 500,
  })
  @IsOptional()
  @IsString({ message: '$property must be a string' })
  @MaxLength(500, {
    message: '$property must be less than $constraint1 characters',
  })
  description: string;

  @ApiProperty({
    description: 'The status of the artist',
    example: 'active',
    required: true,
    enum: ['active', 'inactive', 'deleted'],
  })
  @IsEnum(['active', 'inactive', 'deleted'], {
    message: '$property must be active, inactive or deleted',
  })
  @IsNotEmpty({ message: '$property is required' })
  status: string;

  @ApiProperty({
    description: 'The role of the user',
    example: 'artist',
    required: true,
    enum: ['artist'],
  })
  @IsEnum(['artist'], {
    message: '$property must be artist',
  })
  @IsNotEmpty({ message: '$property is required' })
  role: string;

  @ApiProperty({
    description: 'The Auth0 ID of the artist',
    example: 'auth0|123456789',
    required: true,
  })
  @IsNotEmpty({ message: '$property is required' })
  @IsString({ message: '$property must be a string' })
  auth0Id: string;

  @ApiProperty({
    description: 'The post data',
    type: CreatePostDto,
    required: true,
  })
  @ValidateNested()
  @Type(() => CreatePostDto)
  post: CreatePostDto;

  @ApiProperty({
    description: 'The category data',
    type: ArtistCategoriesDto,
    required: true,
  })
  @ValidateNested()
  @Type(() => ArtistCategoriesDto)
  category: ArtistCategoriesDto;
}
