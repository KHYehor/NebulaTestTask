import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dtos/сreateUser.dto';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UsersRepository {
  private dataSource: Map<number, UserEntity> = new Map<number, UserEntity>();
  private serialCounter: number = 0;

  public async createUser(data: CreateUserDto): Promise<UserEntity> {
    const entity = UserEntity.fromDtoToEntity(data, this.serialCounter);
    this.dataSource.set(this.serialCounter, entity);
    this.serialCounter++;
    return entity;
  }

  public getAllUsers(): Promise<UserEntity[]> {
    return Promise.resolve([...this.dataSource.values()]);
  }

  public getUserById(id: number): Promise<UserEntity | undefined> {
    return Promise.resolve(this.dataSource.get(id));
  }
}
