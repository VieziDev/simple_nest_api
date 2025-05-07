import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { NotFoundException } from '@nestjs/common';

describe('TasksService', () => {
  let service: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TasksService],
    }).compile();

    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new task', () => {
    const createTaskDto: CreateTaskDto = {
      id: 1,
      title: 'Test Task',
      description: 'Test Description',
    };

    const result = service.create(createTaskDto);
    expect(result).toBe('This action adds a new task');

    const tasks = service.findAll();
    expect(tasks).toHaveLength(1);
    expect(tasks[0]).toEqual(createTaskDto);
  });

  it('should find a task by id', () => {
    const createTaskDto: CreateTaskDto = {
      id: 1,
      title: 'Test Task',
      description: 'Test Description',
    };

    service.create(createTaskDto);
    const foundTask = service.findOne(1);
    expect(foundTask).toEqual(createTaskDto);
  });

  it('should throw NotFoundException when finding non-existent task', () => {
    expect(() => service.findOne(999)).toThrow(NotFoundException);
  });

  it('should update a task', () => {
    const createTaskDto: CreateTaskDto = {
      id: 1,
      title: 'Original Title',
      description: 'Original Description',
    };

    service.create(createTaskDto);

    const updateTaskDto: UpdateTaskDto = {
      title: 'Updated Title',
    };

    const result = service.update(1, updateTaskDto);
    expect(result).toBe('Task with id #1 has been updated');

    const updatedTask = service.findOne(1);
    expect(updatedTask.title).toBe('Updated Title');
    expect(updatedTask.description).toBe('Original Description');
  });

  it('should remove a task', () => {
    const createTaskDto: CreateTaskDto = {
      id: 1,
      title: 'Test Task',
      description: 'Test Description',
    };

    service.create(createTaskDto);
    expect(service.findAll()).toHaveLength(1);

    const result = service.remove(1);
    expect(result).toBe('Task with id #1 has been removed');
    expect(service.findAll()).toHaveLength(0);
  });
});
