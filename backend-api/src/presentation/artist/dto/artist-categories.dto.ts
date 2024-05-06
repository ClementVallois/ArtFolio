import { IsArray, IsString } from 'class-validator';

export class ArtistCategoriesDto {
  @IsArray({ message: 'Selected categories must be an array.' })
  @IsString({ each: true, message: 'Each category must be a string.' })
  categories: string[];
}
