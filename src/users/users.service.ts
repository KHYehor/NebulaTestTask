import { Injectable } from '@nestjs/common';
import { UsersRepository } from './repostitories/users.repository';
import { CreateUserDto } from './dtos/сreateUser.dto';
import { HttpService } from '@nestjs/axios';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { lastValueFrom } from 'rxjs';
import { UserDto } from './dtos/user.dto';
import { PurchaseDto } from '../offers/dtos/purchase.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly httpService: HttpService,
    private readonly schedulerRegistry: SchedulerRegistry,
    private readonly configService: ConfigService,
  ) {}

  public async createUser(createUserDto: CreateUserDto): Promise<UserDto> {
    try {
      const user = await this.usersRepository.createUser(createUserDto);
      return user.toDto();
    } catch (error) {
      console.error(
        `[UsersService.createUser] Error during creating user: ${createUserDto}`,
        error,
      );
      throw error;
    }
  }

  public async listUsers(): Promise<UserDto[]> {
    try {
      const users = await this.usersRepository.getAllUsers();
      return users.map((user) => user.toDto());
    } catch (error) {
      console.error(
        '[UsersService.listUsers] Error during listing users',
        error,
      );
      throw error;
    }
  }

  public async getUserById(id: number): Promise<UserDto | undefined> {
    try {
      const user = await this.usersRepository.getUserById(id);
      return user?.toDto();
    } catch (error) {
      console.error(
        `[UsersService.listUsers] Error during getting user by id ${id}`,
        error,
      );
      throw error;
    }
  }

  public sendPostponedReportToUser(purchaseDto: PurchaseDto): void {
    setImmediate(async () => {
      const jobName = `purchase-${purchaseDto.id}`;
      const date = new Date();
      const hour = date.getHours();
      const min = date.getMinutes();
      const job = new CronJob(`${min} ${hour} * * * *`, async () => {
        try {
          const { data } = await lastValueFrom(
            this.httpService.post(this.configService.get('MOCK_URL')),
          );
          console.info(`Report saved data: ${data}`);
        } catch (error) {
          console.error(error);
        } finally {
          this.schedulerRegistry.deleteCronJob(jobName);
        }
      });

      this.schedulerRegistry.addCronJob(jobName, job);
      job.start();
    });
  }
}
