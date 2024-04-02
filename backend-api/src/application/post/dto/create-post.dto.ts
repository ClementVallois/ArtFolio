import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreatePostDto {
  @IsBoolean({ message: 'isPinned must be a boolean' })
  @IsNotEmpty({ message: 'isPinned must not be empty' })
  isPinned: boolean;

  @IsString({ message: 'Description must be a string' })
  description: string;
}
