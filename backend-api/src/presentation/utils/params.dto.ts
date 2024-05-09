import { IsDecimal, IsNotEmpty, IsUUID } from 'class-validator';

export class FindIdParams {
  @IsUUID('4', { message: '$property must be an UUID' })
  @IsNotEmpty({ message: '$property must not be empty' })
  id: string;
}

export class FindAuth0IdParams {
  @IsUUID('4', { message: '$property must be an UUID' })
  @IsNotEmpty({ message: '$property must not be empty' })
  auth0Id: string;
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
  @IsNotEmpty({ message: '$property must not be empty' })
  @IsDecimal({}, { message: '$property must be a number' })
  nb: number;
}
