import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { UsersService } from './users.service';
import { UsersRepository } from './repostitories/users.repository';
import { ScheduleModule } from '@nestjs/schedule';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, ConfigModule, ScheduleModule.forRoot()],
      controllers: [UsersController],
      providers: [UsersService, UsersRepository],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
