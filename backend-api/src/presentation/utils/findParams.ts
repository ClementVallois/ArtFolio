import { IsNotEmpty, IsUUID } from 'class-validator';

export class FindIdParams {
  @IsUUID('4')
  @IsNotEmpty()
  id: string;
}
export class FindUserPostParams {
  @IsUUID('4')
  @IsNotEmpty()
  userId: string;

  @IsUUID('4')
  @IsNotEmpty()
  postId: string;
}
