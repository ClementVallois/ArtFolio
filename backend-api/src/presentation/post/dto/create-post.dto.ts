import {
  IsBoolean,
  IsNotEmpty,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';
import { ToBoolean } from 'src/infrastructure/common/decorators/toBoolean.decorator';

export class CreatePostDto {
  @IsBoolean({ message: '$property must be a boolean, $value given' })
  @IsNotEmpty({ message: '$property must not be empty' })
  @ToBoolean()
  isPinned: boolean;

  @IsString({ message: '$property must be a string' })
  @MaxLength(500, {
    message: '$property must be less than $constraint1 characters',
  })
  description?: string;

  @IsNotEmpty({ message: '$property must not be empty' })
  @IsUUID('4', { message: '$property must be a valid UUID' })
  userId: string;
}
