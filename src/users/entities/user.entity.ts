import { CreateUserDto } from '../dtos/сreateUser.dto';
import { UserDto } from '../dtos/user.dto';

// TODO: validate
export class UserEntity {
  constructor(args?: CreateUserDto, id?: number) {
    Object.assign(this, args, { id });
  }
  public id: number;
  public email: string;
  public marketingData: string[];

  public toDto(): UserDto {
    const dto = new UserDto();
    dto.id = this.id;
    dto.email = this.email;
    dto.marketingData = this.marketingData;

    return dto;
  }

  public static fromDtoToEntity(dto: CreateUserDto, id: number): UserEntity {
    return new UserEntity(dto, id);
  }
}
