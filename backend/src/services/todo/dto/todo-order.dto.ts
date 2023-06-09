import { IsInt } from 'class-validator';
import { Id } from 'src/common/types';

export class TodoOrderDto {
  @IsInt()
  id: Id;

  @IsInt()
  order: number;
}
