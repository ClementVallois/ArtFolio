import { PartialType } from '@nestjs/mapped-types';
import { CreatePostDto } from './create-post.dto';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class UpdatePostDto extends PartialType(CreatePostDto) {
  @IsNotEmpty({ message: 'Must not be empty' })
  @IsUUID('4', { message: 'Must be a valid uuid' })
  id: string;
}
