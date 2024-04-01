import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreatePostDto {
  @IsBoolean({ message: 'Must be a boolean' })
  @IsNotEmpty({ message: 'Must not be empty' })
  isPinned: boolean;

  @IsString({ message: 'Must be a string' })
  description: string;
}
