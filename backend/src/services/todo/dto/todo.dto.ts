import { IsNumber, IsString } from 'class-validator';

export class TodoDto {
  @IsString()
  content: string;

  @IsNumber()
  order: number;
}
