import { Todo } from 'src/database/entities/Todo';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { TodoDto } from './dto/todo.dto';
import { TodoOrderDto } from './dto/todo-order.dto';
import { Id } from 'src/common/types';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) {}

  getAll() {
    return this.todoRepository.find({ order: { order: 'ASC' } });
  }

  create(todoDto: TodoDto) {
    return this.todoRepository.save(todoDto);
  }

  changeOrder(todoOrderDto: TodoOrderDto[]) {
    return this.todoRepository.manager.transaction(async (trxManager) => {
      for (const { id, order } of todoOrderDto) {
        await trxManager
          .withRepository(this.todoRepository)
          .update({ id }, { order });
      }
    });
  }

  async setCompleted(id: Id, completed: boolean) {
    await this.todoRepository.update({ id }, { completed });
  }
}
