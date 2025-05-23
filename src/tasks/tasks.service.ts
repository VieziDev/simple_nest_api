import { Injectable, NotFoundException } from '@nestjs/common';
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
    const task = this.tasks.find((task) => task.id === id);
    if (!task) {
      throw new NotFoundException(`Task with id #${id} not found`);
    }
    return task;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    const taskIndex = this.tasks.findIndex((task) => task.id === id);
    if (taskIndex === -1) {
      return `Task with id #${id} not found`;
    }
    const updatedTask = { ...this.tasks[taskIndex], ...updateTaskDto };
    this.tasks[taskIndex] = updatedTask;
    return `Task with id #${id} has been updated`;
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
