import { PartialType } from '@nestjs/mapped-types';
import { CreatePostDto } from './create-post.dto';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class UpdatePostDto extends PartialType(CreatePostDto) {
  @IsNotEmpty({ message: 'ID must not be empty' })
  @IsUUID('4', { message: 'ID must be a valid UUID' })
  id: string;
}
