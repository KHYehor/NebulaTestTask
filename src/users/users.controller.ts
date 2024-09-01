import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/сreateUser.dto';
import { UsersService } from './users.service';
import { UserDto } from './dtos/user.dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Unexpected error' })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Unexpected error',
  })
  @ApiBody({
    type: CreateUserDto,
    description: 'Create a new user',
  })
  public async create(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    try {
      return await this.usersService.createUser(createUserDto);
    } catch (error) {
      throw new HttpException(
        error.toString(),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  @ApiResponse({ status: HttpStatus.OK, description: 'List of users' })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Unexpected error',
  })
  public async list(): Promise<UserDto[]> {
    try {
      return await this.usersService.listUsers();
    } catch (error) {
      throw new HttpException(
        error.toString(),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  @ApiResponse({ status: HttpStatus.OK, description: 'Single user' })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Unexpected error',
  })
  public async getUser(@Param('id') id: number): Promise<UserDto> {
    let data: UserDto | undefined;
    try {
      data = await this.usersService.getUserById(id);
    } catch (error) {
      throw new HttpException(
        error.toString(),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    if (!data) {
      throw new HttpException(`User not found by ${id}`, HttpStatus.NOT_FOUND);
    }

    return data;
  }
}
