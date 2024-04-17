import { IsNotEmpty, IsUUID } from 'class-validator';

export class FindIdParams {
  @IsUUID('4')
  @IsNotEmpty()
  id: string;
}
