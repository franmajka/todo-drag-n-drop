import { IsBoolean } from 'class-validator';

export class TodoCompletedDto {
  @IsBoolean()
  completed: boolean;
}
