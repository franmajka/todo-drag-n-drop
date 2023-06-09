import {
  Body,
  Controller,
  Get,
  Param,
  ParseArrayPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoDto } from './dto/todo.dto';
import { TodoOrderDto } from './dto/todo-order.dto';
import { Id } from 'src/common/types';
import { TodoCompletedDto } from './dto/todo-completed.dto';

@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get()
  getAll() {
    return this.todoService.getAll();
  }

  @Post()
  create(@Body() todoDto: TodoDto) {
    return this.todoService.create(todoDto);
  }

  @Patch()
  changeOrder(
    @Body(new ParseArrayPipe({ items: TodoOrderDto }))
    todoOrderDto: TodoOrderDto[],
  ) {
    return this.todoService.changeOrder(todoOrderDto);
  }

  @Patch(':id')
  setCompleted(@Param('id') id: Id, @Body() { completed }: TodoCompletedDto) {
    return this.todoService.setCompleted(id, completed);
  }
}
