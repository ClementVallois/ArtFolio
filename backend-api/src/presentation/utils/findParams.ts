import { Transform } from 'class-transformer';
import { IsInt, IsNotEmpty, IsUUID } from 'class-validator';

export class FindIdParams {
  @IsUUID('4', { message: '$property must be an UUID' })
  @IsNotEmpty({ message: '$property must not be empty' })
  id: string;
}
export class FindUserPostParams {
  @IsUUID('4', { message: '$property must be an UUID' })
  @IsNotEmpty({ message: '$property must not be empty' })
  userId: string;

  @IsUUID('4', { message: '$property must be an UUID' })
  @IsNotEmpty({ message: '$property must not be empty' })
  postId: string;
}

export class FindNumberParams {
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt({ message: '$property must be a number' })
  @IsNotEmpty({ message: '$property must not be empty' })
  nb: number;
}
