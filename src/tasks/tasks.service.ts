import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  private readonly tasks: CreateTaskDto[] = [];
  create(createTaskDto: CreateTaskDto) {
    this.tasks.push(createTaskDto);
    return 'This action adds a new task';
  }

  findAll() {
    return this.tasks;
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    const index = this.tasks.findIndex((task) => task.id === id);
    if (index === -1) {
      return `Task with id #${id} not found`;
    }
    this.tasks.splice(index, 1);
    return `Task with id #${id} has been removed`;
  }
}
